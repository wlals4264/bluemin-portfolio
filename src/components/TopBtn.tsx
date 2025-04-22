'use client';

import { useEffect, useState } from 'react';
import '../styles/components/TopBtn.scss';
import { IoMdArrowRoundUp } from 'react-icons/io';

const TopBtn = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`top-btn-container ${showBtn ? 'show' : ''}`}>
      <button onClick={scrollToTop}>
        <IoMdArrowRoundUp />
      </button>
    </div>
  );
};

export default TopBtn;
