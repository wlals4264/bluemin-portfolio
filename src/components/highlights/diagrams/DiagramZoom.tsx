'use client';

import '@/styles/components/DiagramZoom.scss';

import { useEffect, useState, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { LuExpand } from 'react-icons/lu';

/** 하이라이트 카드 안의 다이어그램(SVG·표 등)을 클릭하면 더 큰 화면으로 볼 수 있게 감싸는 래퍼.
 * README 모달 폭에 맞춰 작게 그려지는 다이어그램을 래스터 이미지 캡처 없이 같은 컴포넌트를
 * 그대로 더 넓은 프레임에 다시 렌더링하는 방식이라, 확대해도 화질이 깨지지 않는다. */
export default function DiagramZoom({ children, label }: { children: ReactNode; label: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleTriggerKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        className="hl-diagram-zoom"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={`${label} 크게 보기`}>
        {children}
        <span className="hl-diagram-zoom-badge" aria-hidden="true">
          <LuExpand />
        </span>
      </div>

      {isOpen &&
        createPortal(
          <div className="hl-diagram-zoom-lightbox" onClick={() => setIsOpen(false)}>
            <button
              type="button"
              className="hl-diagram-zoom-close"
              onClick={() => setIsOpen(false)}
              aria-label="닫기">
              <IoIosClose />
            </button>
            <div className="hl-diagram-zoom-frame" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
