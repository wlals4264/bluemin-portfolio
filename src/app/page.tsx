import CodeSnap from '@/components/CodeSnap';
import Introduction from '@/components/Introduction';

import '@/styles/Home.scss';
import AboutMe from './about_me/page';

export default function Home() {
  return (
    <div className="home-wrapper">
      <Introduction />
      <CodeSnap />
      <AboutMe />
    </div>
  );
}
