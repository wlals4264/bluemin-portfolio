import Link from 'next/link';
import Nav from './Nav';
import '@/styles/Header.scss';

export default function Header() {
  const titles = ['About me', 'Skills', 'Archiving', 'Projects', 'Activity'];
  return (
    <div className="header-container">
      <Link href="/home">
        <span className="logo">Jimin&apos;s Portfolio</span>
      </Link>
      <Nav titles={titles} />
    </div>
  );
}
