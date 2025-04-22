'use client';

import { IoArrowDown } from 'react-icons/io5';
import { FaLaptopCode } from 'react-icons/fa';

import '../styles/components/Navigator.scss';
import CodeSnap from './CodeSnap';
import { useState } from 'react';

const Navigator = () => {
  const [isCodeSnapOpen, setIsCodeSnapOpen] = useState<boolean>(false);
  // TODO: 스크롤 스냅 구현

  return (
    <div className="navigator-container">
      <div className="more-btn-container">
        <button type="button">
          <IoArrowDown />
          <span>more</span>
          {/* <IoIosArrowDown /> */}
        </button>
        <button type="button" onClick={() => setIsCodeSnapOpen(!isCodeSnapOpen)}>
          <FaLaptopCode />
          <span>{isCodeSnapOpen ? 'close terminal' : 'use terminal'}</span>
        </button>
      </div>
      {isCodeSnapOpen && <CodeSnap />}
    </div>
  );
};

export default Navigator;
