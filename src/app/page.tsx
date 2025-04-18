// import CodeSnap from '@/components/CodeSnap';
import Introduction from '@/components/Introduction';
import AboutMe from '../components/AboutMe';
import Skills from '@/components/Skills';

import '@/styles/Home.scss';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <div className="home-wrapper">
      <Introduction />
      {/* <CodeSnap /> */}
      <AboutMe />
      <Skills />
      <Projects />
    </div>
  );
}
