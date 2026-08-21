'use client';

import '@/styles/components/Introduction.scss';
import Image from 'next/image';
import IntroductionBtns from './IntroductionBtns';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const sentences = [
  <span className="korean" key={0}>
    Next.js 웹과 Flutter 하이브리드에서
    <br />
    WebView·Native 브릿지까지 다루는 프론트엔드 개발자입니다.
  </span>,
  <span className="korean" key={1}>
    수면 헬스케어에서 기능 개발부터
    <br />
    Playwright E2E·GA4·Admin까지 운영 사이클을 닫습니다.
  </span>,
  <span className="korean" key={2}>
    Web–Native 경계의 navigation·권한·데이터 정합을
    <br />
    원인부터 잡고 구조로 풉니다.
  </span>,
  <span className="korean" key={3}>
    Cursor Rules/Skills와 E2E로
    <br />
    AI 작업도 같은 검증 게이트를 거치게 합니다.
  </span>,
];

const Introduction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % sentences.length);
          gsap.fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="introduction-container">
      <div className="introduction-text-box">
        <span>Front-end Developer</span>
        <h1>
          Hello I&apos;m <br /> <span>Jimin Kim</span>
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
          priority
        />
      </div>
    </div>
  );
};

export default Introduction;
