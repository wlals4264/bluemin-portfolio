import { FiDownload } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

import '../styles/components/IntroductionBtns.scss';
const IntroductionBtns = () => {
  return (
    <div className="introduction-btns-container">
      <a href="/frontend_jimin_resume.pdf" download className="download-btn">
        Download CV
        <FiDownload />
      </a>
      <div className="social-btns">
        <a href="https://github.com/wlals4264" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://velog.io/@wlals4264/posts" target="_blank" rel="noopener noreferrer">
          <SiVelog />
        </a>
      </div>
    </div>
  );
};

export default IntroductionBtns;
