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
        {/* resume-ashen-mu 사이트의 "이력서"/"포트폴리오" 탭 둘 다 같은 /api/pdf 하나로
            연결된다(그쪽에 별도 포트폴리오 전용 PDF가 없음, 실측 확인) — 위 "Download
            Resume"와 같은 URL이지만, 아이콘 한 줄에서 바로 찾을 수 있는 보조 진입점으로 둔다.
            target 없이 그 자리에서 바로 다운로드되는 것도 위 버튼과 동일. */}
        <GlassButton
          as="a"
          shape="circle"
          href="https://resume-ashen-mu.vercel.app/api/pdf"
          aria-label="포트폴리오 PDF 다운로드"
          title="포트폴리오 PDF 다운로드">
          <LuFileDown />
        </GlassButton>
      </div>
    </div>
  );
};

export default IntroductionBtns;
