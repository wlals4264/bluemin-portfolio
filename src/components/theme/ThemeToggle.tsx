'use client';

import '@/styles/components/ThemeToggle.scss';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

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
