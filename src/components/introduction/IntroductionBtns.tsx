import { FiDownload } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import { LuFileDown } from 'react-icons/lu';

import GlassButton from '@/components/common/buttons/GlassButton';

import '@/styles/components/IntroductionBtns.scss';

const IntroductionBtns = () => {
  return (
    <div className="introduction-btns-container">
      {/* /api/pdf는 Content-Disposition: attachment로 내려와서 브라우저가 새 탭/페이지
          이동 없이 그 자리에서 바로 파일을 받는다(resume-ashen-mu 사이트 자체의 "PDF
          저장" 버튼과 동일한 체감) — target="_blank"를 걸면 오히려 불필요한 빈 탭이
          잠깐 열렸다 닫히는 것처럼 보여서 뺀다. */}
      <GlassButton as="a" tone="accent" className="download-btn" href="https://resume-ashen-mu.vercel.app/api/pdf">
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
        {/* 이력서(Download Resume)와 달리 이건 resume-ashen-mu API가 아니라
            public/portfolio_kimjimin.pdf — 프로젝트별 Work & Impact 케이스 스터디까지
            담은, 사용자가 직접 만든 정적 포트폴리오 PDF다. download 속성으로 실제
            저장 파일명을 "포트폴리오_김지민.pdf"로 고정한다. */}
        <GlassButton
          as="a"
          shape="circle"
          href="/portfolio_kimjimin.pdf"
          download="포트폴리오_김지민.pdf"
          aria-label="포트폴리오 PDF 다운로드"
          title="포트폴리오 PDF 다운로드">
          <LuFileDown />
        </GlassButton>
      </div>
    </div>
  );
};

export default IntroductionBtns;
