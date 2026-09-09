import { FiDownload } from 'react-icons/fi';
import { FaGithub, FaAddressCard } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import { LuNotebookPen } from 'react-icons/lu';

import GlassButton from '@/components/common/buttons/GlassButton';

import '@/styles/components/IntroductionBtns.scss';

const IntroductionBtns = () => {
  return (
    <div className="introduction-btns-container">
      <GlassButton
        as="a"
        tone="accent"
        className="download-btn"
        href="https://resume-ashen-mu.vercel.app/api/pdf"
        target="_blank"
        rel="noopener noreferrer">
        Download Resume
        <FiDownload />
      </GlassButton>
      <div className="social-btns">
        <GlassButton
          as="a"
          shape="circle"
          href="https://github.com/wlals4264"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub">
          <FaGithub />
        </GlassButton>
        <GlassButton
          as="a"
          shape="circle"
          href="https://velog.io/@wlals4264/posts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Velog">
          <SiVelog />
        </GlassButton>
        <GlassButton
          as="a"
          shape="circle"
          href="https://resume-ashen-mu.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="이력서·포트폴리오 사이트"
          title="이력서·포트폴리오 사이트">
          <FaAddressCard />
        </GlassButton>
        <GlassButton
          as="a"
          shape="circle"
          href="https://work-log-calendar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="통합 업무일지"
          title="통합 업무일지">
          <LuNotebookPen />
        </GlassButton>
      </div>
    </div>
  );
};

export default IntroductionBtns;
