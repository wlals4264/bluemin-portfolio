import '@/styles/components/Header.scss';
import Link from 'next/link';
import Nav from './Nav';

type HeaderProps = {
  sectionRefs: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
};
export default function Header({ sectionRefs }: HeaderProps) {
  const titles = ['About me', 'Skills', 'Projects', 'Experiences'];

  return (
    <div className="header-container">
      <Link href="/">
        <h1 className="logo">Jimin&apos;s Portfolio</h1>
      </Link>
      <Nav titles={titles} sectionRefs={sectionRefs} />
    </div>
  );
}
