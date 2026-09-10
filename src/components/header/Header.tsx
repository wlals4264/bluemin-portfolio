import '@/styles/components/Header.scss';

import Link from 'next/link';
import { RefObject } from 'react';

import Nav from '@/components/nav/Nav';
import ThemeToggle from '@/components/theme/ThemeToggle';

type SectionName = 'about' | 'career' | 'skills' | 'projects' | 'experiences';

type HeaderProps = {
  sectionRefs: {
    [key in SectionName]: RefObject<HTMLDivElement | null>;
  };
};
export default function Header({ sectionRefs }: HeaderProps) {
  const titles = [
    { label: 'About me', key: 'about' },
    { label: 'Career', key: 'career' },
    { label: 'Skills', key: 'skills' },
    { label: 'Projects', key: 'projects' },
    { label: 'Experiences', key: 'experiences' },
  ];

  // 예전엔 우측 하단에 별도의 "맨 위로" 플로팅 버튼(TopBtn)이 있었지만, Contact
  // launcher(96px 원형 버튼)와 같은 모서리에 쌓이면서 시각적으로 붐볐다. 로고 클릭 시
  // 맨 위로 스크롤하는 건 흔한 관례라 그쪽으로 기능을 옮기고 TopBtn은 제거했다 — 로고가
  // 항상 보이는 헤더 안에 있어서 발견성도 크게 떨어지지 않는다.
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <Link href="/" onClick={scrollToTop}>
          <h1 className="logo">Jimin&apos;s Portfolio</h1>
        </Link>
        <div className="header-actions">
          <Nav titles={titles} sectionRefs={sectionRefs} />
          <Link href="/design-system" className="header-ds-link" aria-label="Design System 페이지로 이동">
            <span className="header-ds-link__full" aria-hidden="true">
              Design System
            </span>
            <span className="header-ds-link__compact" aria-hidden="true">
              DS
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
