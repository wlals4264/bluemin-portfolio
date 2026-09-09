'use client';

import '@/styles/components/TopBtn.scss';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

import GlassButton from '@/components/common/buttons/GlassButton';

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
      <GlassButton shape="circle" className="top-btn" aria-label="맨 위로" onClick={scrollToTop}>
        <FaArrowUp />
      </GlassButton>
    </div>
  );
};

export default TopBtn;
