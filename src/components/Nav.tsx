import Link from 'next/link';
import '../styles/components/Nav.scss';

interface NavItem {
  path: string;
  title: string;
}

interface NavProps {
  nav: NavItem[];
}

export default function Nav({ nav }: NavProps) {
  return (
    <nav>
      {nav.map((navItem) => {
        return (
          <Link href={navItem.path} key={navItem.title}>
            {/* <span></span> */}
            {navItem.title}
          </Link>
        );
      })}
      <Link href="/contact">
        <button>Hire me!</button>
      </Link>
    </nav>
  );
}
