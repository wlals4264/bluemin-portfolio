import { ReactNode } from 'react';

import { FiDownload } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import { LuFileDown } from 'react-icons/lu';

import GlassButton from '@/components/common/buttons/GlassButton';

import '@/styles/components/IntroductionBtns.scss';

type SocialLink = {
  href: string;
  /** aria-label이자 hover/focus 시 뜨는 말풍선 카피 — 아이콘만으로 뭘 하는 버튼인지
   * 알기 어려우니 접근성 이름과 화면에 보이는 말풍선을 같은 문구로 통일한다. */
  label: string;
  icon: ReactNode;
  /** 외부 사이트 페이지로 이동하는 링크만 새 탭으로 연다 — 파일 다운로드는
   * target="_blank"를 걸면 오히려 빈 탭이 잠깐 열렸다 닫히는 것처럼 보여서 뺀다. */
  external?: boolean;
  /** 지정하면 그 파일명으로 바로 다운로드된다(다운로드 링크 전용). */
  download?: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://github.com/wlals4264', label: 'GitHub', icon: <FaGithub />, external: true },
  { href: 'https://velog.io/@wlals4264/posts', label: 'Velog', icon: <SiVelog />, external: true },
  {
    // resume-ashen-mu API(이력서용, 3p)가 아니라 public/portfolio_kimjimin.pdf —
    // 프로젝트별 Work & Impact 케이스 스터디까지 담은, 사용자가 직접 만든 정적
    // 포트폴리오 PDF다.
    href: '/portfolio_kimjimin.pdf',
    label: '포트폴리오 PDF 다운로드',
    icon: <LuFileDown />,
    download: '포트폴리오_김지민.pdf',
  },
];

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
        {SOCIAL_LINKS.map((link) => (
          <div key={link.label} className="social-btn-wrap">
            <GlassButton
              as="a"
              shape="circle"
              href={link.href}
              aria-label={link.label}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(link.download ? { download: link.download } : {})}>
              {link.icon}
            </GlassButton>
            <span className="social-btn-tooltip" role="tooltip" aria-hidden="true">
              {link.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroductionBtns;
