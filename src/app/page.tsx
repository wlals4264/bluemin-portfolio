// import CodeSnap from '@/components/CodeSnap';
import Introduction from '@/components/Introduction';

import '@/styles/Home.scss';
import AboutMe from '../components/AboutMe';

export default function Home() {
  return (
    <div className="home-wrapper">
      <Introduction />
      {/* <CodeSnap /> */}
      <AboutMe />
    </div>
  );
}
