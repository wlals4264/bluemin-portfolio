'use client';

/**
 * 보류 기능 (2026.07)
 * - more: 헤더 섹션 내비와 역할이 겹침
 * - use terminal: UX 미성숙으로 일시 비활성
 * page.tsx에서 Navigator 마운트만 주석 처리해 두었음. 재개 시 아래 블록·import 복구.
 */

import '@/styles/components/Navigator.scss';

import { RefObject } from 'react';

// import { IoArrowDown } from 'react-icons/io5';
// import { FaLaptopCode } from 'react-icons/fa';
// import { useState } from 'react';
// import CodeSnap from './CodeSnap';

type SectionName = 'about' | 'career' | 'skills' | 'projects' | 'experiences';

interface NavigatorProps {
  sectionRefs: {
    [key in SectionName]: RefObject<HTMLDivElement | null>;
  };
}

const Navigator = ({}: NavigatorProps) => {
  // const [isCodeSnapOpen, setIsCodeSnapOpen] = useState(false);
  // const handleMoreClick = () => {
  //   sectionRefs.about?.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  return null;

  /* 재개용 마크업 — props: sectionRefs
  return (
    <div className="navigator-container">
      <div className="more-btn-container">
        <button type="button" onClick={handleMoreClick}>
          <IoArrowDown />
          <span>more</span>
        </button>
        <button type="button" onClick={() => setIsCodeSnapOpen(!isCodeSnapOpen)}>
          <FaLaptopCode />
          <span>{isCodeSnapOpen ? 'close terminal' : 'use terminal'}</span>
        </button>
      </div>
      {isCodeSnapOpen && <CodeSnap sectionRefs={sectionRefs} />}
    </div>
  );
  */
};

export default Navigator;
