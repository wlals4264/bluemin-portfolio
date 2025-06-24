import type { Metadata } from 'next';
import { Jua, Nanum_Gothic_Coding, Poetsen_One, Dongle } from 'next/font/google';
import '../styles/globals.scss';
import '../styles/Home.scss';

const jua = Jua({
  variable: '--font-jua',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const nanumGothicCoding = Nanum_Gothic_Coding({
  variable: '--font-nanum-gothic-coding',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const poesenOne = Poetsen_One({
  variable: '--font-poesen-one',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const dongle = Dongle({
  variable: '--font-poesen-one',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `프론트엔드 개발자 김지민 포트폴리오 :: Bluemin's portfolio`,
  description: '프론트 엔드 개발자 김지민(Bluemin)의 포트폴리오입니다.',
  icons: {
    icon: '/bluemin.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jua.variable} ${nanumGothicCoding.variable} ${poesenOne.variable} ${dongle}`}>
        {children}
      </body>
    </html>
  );
}
