'use client';

import gsap from 'gsap';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // GSAP 애니메이션 실행
    gsap.fromTo(
      '.sun',
      {
        yPercent: 0,
      },
      {
        yPercent: -50,
        duration: 5,
        ease: 'easeInOut',
      }
    );
  }, []);

  return (
    <div className="landing-container">
      <div className="slogan">
        <h1>Endlessly swim through the vast and deep sea of the web.</h1>
      </div>
      <div className="wave-one"></div>
      <div className="wave-two"></div>
      <div className="wave-three"></div>
      <div className="wave-four"></div>
      <div className="sun"></div>
    </div>
  );
}
