import Link from 'next/link';
import Nav from './Nav';
import '@/styles/components/Header.scss';

export default function Header() {
  const nav = [
    { title: 'About me', path: '/about_me' },
    { title: 'Skills', path: '/skills' },
    { title: 'Archiving', path: '/archiving' },
    { title: 'Projects', path: '/projects' },
    { title: 'Activity', path: '/activity' },
  ];

  return (
    <div className="header-container">
      <Link href="/">
        <h1 className="logo">Jimin&apos;s Portfolio</h1>
      </Link>
      <Nav nav={nav} />
    </div>
  );
}
