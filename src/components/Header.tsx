import Link from 'next/link';
import Nav from './Nav';
import '@/styles/components/Header.scss';

export default function Header() {
  const titles = ['About me', 'Skills', 'Projects', 'Experiences'];

  return (
    <div className="header-container">
      <Link href="/">
        <h1 className="logo">Jimin&apos;s Portfolio</h1>
      </Link>
      <Nav titles={titles} />
    </div>
  );
}
