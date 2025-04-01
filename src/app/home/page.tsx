import Header from '@/components/Header';
import Link from 'next/link';
import HomeLayout from './layout';

export default function Home() {
  return (
    <HomeLayout>
      <Link href="/home">
        <span className="logo">Jimin&apos;s Portfolio</span>
      </Link>
      <Header />
    </HomeLayout>
  );
}
