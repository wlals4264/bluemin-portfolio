'use client';

import '@/styles/components/Introduction.scss';
import Image from 'next/image';
import IntroductionBtns from './IntroductionBtns';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const sentences = [
  <span className="korean" key={0}>
    사용자 입장에서 제품을 개발합니다.
    <br />
    화면만이 아니라 쓰는 사람의 맥락까지 봅니다.
  </span>,
  <span className="korean" key={1}>
    기능을 만드는 데서 그치지 않고
    <br />앱 전반의 운영까지 경험했습니다.
  </span>,
  <span className="korean" key={2}>
    문제가 생기면 증상만 가지고 판단하지 않고
    <br />
    원인부터 잡아 구조로 풉니다.
  </span>,
  <span className="korean" key={3}>
    빠르게 만들더라도
    <br />
    품질을 검증하는 과정을 거칩니다.
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
