'use client';

import '../styles/components/Introduction.scss';
import Image from 'next/image';
import IntroductionBtns from './IntroductionBtns';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const sentences = [
  <span key={0}>
    I&apos;m a frontend developer constantly learning,
    <br />
    creating, and exploring the endless ocean of the web
  </span>,
  <span className="korean" key={1}>
    넓고 깊은 웹이라는 바다를 끊임없이 배우고,
    <br />
    창조하고, 탐험하는 프런트엔드 개발자입니다.
  </span>,
  <span className="korean" key={2}>
    사용자 경험을 향상시키는 UI 설계를 지향하며,
    <br />
    클린 코드와 성능 최적화에 집중하고 있습니다.
  </span>,
];

const Introduction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // 슬라이드 업 아웃
      gsap.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // 문장 바꾸고 슬라이드 인
          setCurrentIndex((prev) => (prev + 1) % sentences.length);
          gsap.fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div className="introduction-container">
      <div className="introduction-text-box">
        <span>Front-end Developer</span>
        <h1>
          Hello I&apos;m <br /> <span>Kim Jimin</span>
        </h1>
        <div className="sentences-box">
          <p ref={textRef} className="fade-in">
            {sentences[currentIndex]}
          </p>
        </div>

        <IntroductionBtns />
      </div>
      <div className="introduction-image-box">
        <svg className="rotating-border" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="160" />
        </svg>
        <Image
          src="/profile.webp"
          quality={100}
          alt="profile image"
          className="profile-image"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Introduction;
