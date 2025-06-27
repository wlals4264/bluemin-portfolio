import '@/styles/components/Header.scss';

import Link from 'next/link';
import { RefObject } from 'react';

import Nav from '@/components/nav/Nav';

type SectionName = 'about' | 'skills' | 'projects' | 'experiences';

type HeaderProps = {
  sectionRefs: {
    [key in SectionName]: RefObject<HTMLDivElement | null>;
  };
};
export default function Header({ sectionRefs }: HeaderProps) {
  const titles = [
    { label: 'About me', key: 'about' },
    { label: 'Skills', key: 'skills' },
    { label: 'Projects', key: 'projects' },
    { label: 'Experiences', key: 'experiences' },
  ];

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <Link href="/">
          <h1 className="logo">Jimin&apos;s Portfolio</h1>
        </Link>
        <Nav titles={titles} sectionRefs={sectionRefs} />
      </div>
    </div>
  );
}
