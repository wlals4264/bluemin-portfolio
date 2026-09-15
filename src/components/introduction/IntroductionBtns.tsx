import { FiDownload } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import { LuFileDown } from 'react-icons/lu';

import GlassButton from '@/components/common/buttons/GlassButton';

import '@/styles/components/IntroductionBtns.scss';

/**
 * 포트폴리오 PDF 다운로드 — 별도 서버 렌더링(Puppeteer 등) 없이 브라우저 인쇄 기능을
 * 그대로 쓴다. `globals.scss`의 `@media print` 규칙이 이 사이트를 인쇄용 레이아웃으로
 * 바꿔주므로, 사용자가 인쇄 대화상자에서 "PDF로 저장"만 고르면 된다 — 항상 지금 보이는
 * 최신 콘텐츠 그대로라 "실시간 연결"이라는 요구사항을 서버 없이 만족한다.
 */
const handleDownloadPortfolioPdf = () => {
  window.print();
};

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
          as="button"
          shape="circle"
          onClick={handleDownloadPortfolioPdf}
          aria-label="포트폴리오 PDF 다운로드"
          title="포트폴리오 PDF 다운로드">
          <LuFileDown />
        </GlassButton>
      </div>
    </div>
  );
};

export default IntroductionBtns;
