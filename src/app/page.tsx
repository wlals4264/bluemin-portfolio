'use client';

import '@/styles/Home.scss';

import { useRef } from 'react';

import Introduction from '@/components/introduction/Introduction';
import AboutMe from '@/components/about-me/AboutMe';
import Career from '@/components/career/Career';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Experiences from '@/components/experience/Experiences';
// 보류: more / use terminal — 헤더 내비와 겹치고 터미널 UX 미성숙. 재개 시 Navigator 복구
// import Navigator from '@/components/nav/Navigator';
import Header from '@/components/header/Header';
import TopBtn from '@/components/common/buttons/TopBtn';

export default function Home() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    about: aboutMeRef,
    career: careerRef,
    skills: skillsRef,
    projects: projectsRef,
    experiences: experiencesRef,
  };

  return (
    <>
      <div className="home-wrapper">
        <Header sectionRefs={sectionRefs} />
        <Introduction />
        {/* <Navigator sectionRefs={sectionRefs} /> */}
        <AboutMe ref={aboutMeRef} />
        <Career ref={careerRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Experiences ref={experiencesRef} />
        <TopBtn />
      </div>
    </>
  );
}
