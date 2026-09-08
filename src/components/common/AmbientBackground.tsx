'use client';

import '@/styles/components/AmbientBackground.scss';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';

/** jquery.ripples가 물결로 왜곡할 "물" 텍스처를 만든다. 실제 이미지가 아니라
 * 세로로 아주 옅게 번지는 하늘색 그라데이션 한 장이라, 물결이 일어도 화면에는
 * 은은한 색 변화만 보인다 — 그라데이션 자체는 실시간으로 캔버스에 그려서
 * 라이트/다크 테마의 --bg·--accent-soft 값을 그대로 반영한다. */
function createSkyTexture(theme: 'light' | 'dark'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const styles = getComputedStyle(document.documentElement);
  const bg = styles.getPropertyValue('--bg').trim() || (theme === 'dark' ? '#0b1220' : '#ffffff');
  const accentSoft =
    styles.getPropertyValue('--accent-soft').trim() || (theme === 'dark' ? '#1e3a5f' : '#dbeafe');

  // 세로 그라데이션이면 물결이 딱 위아래로 흔들릴 때만 보인다 — 대각선으로
  // 깔아두면 어느 방향으로 물결이 퍼지든 색 차이가 드러나 더 잘 보인다.
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, bg);
  gradient.addColorStop(1, accentSoft);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/png');
}

/** 사이트 전체 배경에 거의 티가 안 날 만큼 옅게 깔리는 하늘색 워시를,
 * jquery.ripples(WebGL)로 실제 수면처럼 물결치게 만든다. 마우스가 지나가면
 * 잔물결이, 클릭하면 큰 파문이 진짜 물처럼 배경 텍스처를 굴절시킨다.
 * `.home-wrapper`(스크롤 리빌 섹션들의 조상)와 형제로 두어야 한다 — RevealSection이
 * visible 상태에서도 transform을 계속 갖고 있어서, 그 안에 두면 position:fixed 배경이
 * 뷰포트가 아니라 그 섹션 안에 갇혀버린다(README 모달 딤 처리 때 겪었던 문제와 동일). */
const AmbientBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || shouldReduceMotion) return;

    let cancelled = false;
    let $el: JQuery<HTMLElement> | undefined;
    let handlePointerMove: ((e: PointerEvent) => void) | undefined;
    let handlePointerDown: ((e: PointerEvent) => void) | undefined;
    const dropRadius = 35;

    (async () => {
      // jquery.ripples는 구형 jQuery 플러그인이라 window.jQuery 전역을 기대한다.
      // 브라우저에서만 동작해야 하니 여기서 동적 import로 불러온다.
      const jqueryModule = await import('jquery');
      const $ = jqueryModule.default;
      (window as unknown as { jQuery: typeof $; $: typeof $ }).jQuery = $;
      (window as unknown as { jQuery: typeof $; $: typeof $ }).$ = $;
      await import('jquery.ripples');
      if (cancelled) return;

      const textureUrl = createSkyTexture(theme);
      $el = $(el);

      try {
        // 물결 세기는 이 네 값으로 조절한다 (숫자 하나 바꿀 때마다 저장하면
        // 바로 반영된다 — 브라우저에서 새로고침 후 마우스를 움직여보면 됨):
        // - perturbance: 굴절 강도. 제일 체감이 큰 값. 0.03~0.08 사이로 시도해보기
        //   (기본 라이브러리 예시는 0.03~0.04, 지금은 그보다 좀 더 강하게 잡아둔 상태)
        // - dropRadius: 파문 하나의 반지름(px). 클수록 넓게 퍼짐
        // - resolution: 시뮬레이션 격자 해상도. 높일수록 물결이 촘촘하고
        //   부드럽지만 GPU 부담이 커짐 (256~512 권장)
        // interactive는 꺼둔다 — 플러그인이 내부적으로 이 엘리먼트(z-index:-1로
        // 맨 뒤에 깔림) 자체에만 mousemove를 걸어서, 실제로는 그 위를 덮은
        // 콘텐츠가 이벤트를 먼저 채가 거의 발동하지 않았다. 대신 아래에서
        // window에 직접 걸어 항상 반응하게 한다.
        $el.ripples({
          imageUrl: textureUrl,
          resolution: 450,
          dropRadius,
          perturbance: 0.055,
          interactive: false,
        });

        const instance = $el.data('ripples');
        if (instance) {
          handlePointerMove = (e: PointerEvent) => {
            instance.dropAtPointer(
              { pageX: e.clientX + window.scrollX, pageY: e.clientY + window.scrollY },
              dropRadius,
              0.01,
            );
          };
          handlePointerDown = (e: PointerEvent) => {
            instance.dropAtPointer(
              { pageX: e.clientX + window.scrollX, pageY: e.clientY + window.scrollY },
              dropRadius * 1.5,
              0.14,
            );
          };
          window.addEventListener('pointermove', handlePointerMove);
          window.addEventListener('pointerdown', handlePointerDown);
        }
      } catch {
        // WebGL 미지원 브라우저 — CSS의 정적 그라데이션(.is-static)으로 자연스럽게 대체된다.
        el.classList.add('is-static');
      }
    })();

    return () => {
      cancelled = true;
      if (handlePointerMove) window.removeEventListener('pointermove', handlePointerMove);
      if (handlePointerDown) window.removeEventListener('pointerdown', handlePointerDown);
      try {
        $el?.ripples('destroy');
      } catch {
        /* 초기화 자체가 안 됐으면 destroy도 조용히 무시 */
      }
    };
  }, [shouldReduceMotion, theme]);

  return (
    <div
      ref={rootRef}
      className={`ambient-background${shouldReduceMotion ? ' is-static' : ''}`}
      aria-hidden="true"
    />
  );
};

export default AmbientBackground;
