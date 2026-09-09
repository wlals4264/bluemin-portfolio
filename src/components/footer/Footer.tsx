import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

import '@/styles/components/Footer.scss';

/**
 * 포트폴리오 최하단 Footer — production component.
 *
 * 카피라이트 바 위주의 최소 구성(사용자 결정) — 배경을 두지 않아 AmbientBackground의
 * 물결이 그대로 비친다. GitHub/Resume/Email은 Hero(IntroductionBtns)에 이미 있어
 * 여기서 중복하지 않는다.
 *
 * Design System 링크는 페이지 맨 아래까지 온 방문자에게 다시 한번 보여주는 보조
 * 진입점이다 — 항상 보이는 주 진입점은 Header(header-ds-link)에 있다.
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner home-wrapper">
        <Link href="/design-system" className="site-footer__ds-link">
          Design System
          <IoArrowForward aria-hidden="true" />
        </Link>
        <p>Built with Next.js · TypeScript</p>
        <p>Designed &amp; developed by Jimin Kim</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
