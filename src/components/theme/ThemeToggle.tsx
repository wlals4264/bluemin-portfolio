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
      {isDark ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}
