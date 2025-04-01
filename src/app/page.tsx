'use client';

import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    gsap.to('.wave-one', {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'linear',
    });

    gsap.to('.wave-two', {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: 'linear',
    });

    gsap.to('.wave-three', {
      rotation: 360,
      duration: 7,
      repeat: -1,
      ease: 'linear',
    });

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
        <h1>
          &quot;Endlessly swim through the vast and deep sea of the web.&quot;
          <br />
          &quot;넓고 깊은 웹이라는{' '}
          <span className="sea" onClick={() => router.push('/home')}>
            바다
          </span>
          를 끊임없이 헤엄쳐라&quot;
        </h1>
        {/* <button className="active">click here!!</button> */}
      </div>
      <div className="wave-one"></div>
      <div className="wave-two"></div>
      <div className="wave-three"></div>
      <div className="wave-four"></div>
      <div className="sun"></div>
    </div>
  );
}
