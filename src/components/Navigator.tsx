'use client';

import '../styles/components/Navigator.scss';
import { IoArrowDown } from 'react-icons/io5';
import { FaLaptopCode } from 'react-icons/fa';
import CodeSnap from './CodeSnap';
import { RefObject, useState } from 'react';

type SectionName = 'about' | 'skills' | 'projects' | 'experiences';

interface NavigatorProps {
  sectionRefs: {
    [key in SectionName]: RefObject<HTMLDivElement | null>;
  };
}
const Navigator = ({ sectionRefs }: NavigatorProps) => {
  const [isCodeSnapOpen, setIsCodeSnapOpen] = useState<boolean>(false);

  const handleMoreClick = () => {
    sectionRefs['about']?.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
};

export default Navigator;
