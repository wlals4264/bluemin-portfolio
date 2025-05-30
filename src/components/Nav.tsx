'use client';

import '../styles/components/Nav.scss';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

type TitleItem = {
  label: string;
  key: string;
};

type NavProps = {
  titles: TitleItem[];
  sectionRefs: {
    [key: string]: React.RefObject<HTMLDivElement | null>;
  };
};

export default function Nav({ titles, sectionRefs }: NavProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const handleClick = (title: string) => {
    const targetRef = sectionRefs[title];
    targetRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav-container ${isNavOpen ? 'open' : ''}`}>
        {titles.map(({ label, key }) => (
          <span key={key} onClick={() => handleClick(key)}>
            {label}
          </span>
        ))}
        <button className="hire-me-btn">Hire me!</button>
      </nav>

      <button className="nav-toggle" onClick={() => setIsNavOpen((prev) => !prev)} aria-label="toggle nav">
        <GiHamburgerMenu size={24} />
      </button>
    </>
  );
}
