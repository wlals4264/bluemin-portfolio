'use client';

import { useEffect, useState } from 'react';

import '@/styles/components/ThemeToggle.scss';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // ThemeProvider의 초기 상태는 layout.tsx의 pre-hydration 스크립트가 이미 설정해둔
  // <html data-theme>를 읽어오므로(SSR에서는 항상 'light') 클라이언트 첫 렌더부터
  // 서버와 값이 달라질 수 있다 — 그대로 쓰면 이 버튼의 aria-label/title/아이콘이
  // 하이드레이션 mismatch 경고를 낸다(astra-review 이후 브라우저 QA에서 발견).
  // 마운트 전까지는 서버와 동일한 'light' 가정으로 렌더링해 첫 렌더를 일치시키고,
  // 마운트 후 다음 틱에만(순수 클라이언트 리렌더) 실제 테마로 갈아탄다.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? 'Light mode' : 'Dark mode'}>
      {/* MdDarkMode(초승달)는 SVG 바운딩 박스는 중앙이지만 채워진 모양 자체가
          한쪽으로 쏠려 있어(optical centering 문제) 아이콘이 살짝 어긋나 보인다.
          살짝 반대 방향으로 밀어서 시각적으로 중앙에 오도록 보정한다. */}
      {isDark ? <MdLightMode /> : <MdDarkMode className="icon-moon" />}
    </button>
  );
}
