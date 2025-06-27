'use client';

import '@/styles/Home.scss';

import { useRef } from 'react';

import Introduction from '@/components/introduction/Introduction';
import AboutMe from '@/components/about-me/AboutMe';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Experiences from '@/components/experience/Experiences';
import Navigator from '@/components/nav/Navigator';
import Header from '@/components/header/Header';
import TopBtn from '@/components/common/buttons/TopBtn';

export default function Home() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    about: aboutMeRef,
    skills: skillsRef,
    projects: projectsRef,
    experiences: experiencesRef,
  };

  return (
    <>
      <div className="home-wrapper">
        <Header sectionRefs={sectionRefs} />
        <Introduction />
        <Navigator sectionRefs={sectionRefs} />
        <AboutMe ref={aboutMeRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Experiences ref={experiencesRef} />
        <TopBtn />
      </div>
    </>
  );
}
