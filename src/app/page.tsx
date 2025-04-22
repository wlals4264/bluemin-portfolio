// import CodeSnap from '@/components/CodeSnap';
import Introduction from '@/components/Introduction';
import AboutMe from '../components/AboutMe';
import Skills from '@/components/Skills';

import '@/styles/Home.scss';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Navigator from '@/components/Navigator';

export default function Home() {
  return (
    <div className="home-wrapper">
      <Introduction />
      <Navigator />
      <AboutMe />
      <Skills />
      <Projects />
      <Experiences />
    </div>
  );
}
