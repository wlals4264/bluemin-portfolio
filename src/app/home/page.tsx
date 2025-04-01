import Header from '@/components/Header';
import Image from 'next/image';
import '@/styles/Home.scss';

export default function Home() {
  return (
    <div className="header-box">
      <Header />
      <div className="image-container">
        <Image src="/main.jpeg" alt="main image" className="main-image" layout="fill" objectFit="cover" />
        <div className="overlay"></div>
      </div>
    </div>
  );
}
