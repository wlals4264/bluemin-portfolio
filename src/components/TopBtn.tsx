'use client';

import { useEffect, useState } from 'react';
import '../styles/components/TopBtn.scss';
import { FaArrowUp } from 'react-icons/fa6';

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
      <div className="top-btn" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    </div>
  );
};

export default TopBtn;
