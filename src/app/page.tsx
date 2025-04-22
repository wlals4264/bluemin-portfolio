'use client';

import '@/styles/Home.scss';
import Introduction from '@/components/Introduction';
import AboutMe from '../components/AboutMe';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Navigator from '@/components/Navigator';
import Header from '@/components/Header';
import { useRef } from 'react';

export default function Home() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    'About me': aboutMeRef,
    Skills: skillsRef,
    Projects: projectsRef,
    Experiences: experiencesRef,
  };

  return (
    <div className="home-wrapper">
      <Header sectionRefs={sectionRefs} />
      <Introduction />
      <Navigator />
      <AboutMe ref={aboutMeRef} />
      <Skills ref={skillsRef} />
      <Projects ref={projectsRef} />
      <Experiences ref={experiencesRef} />
    </div>
  );
}
