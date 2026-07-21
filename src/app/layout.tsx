import type { Metadata } from 'next';
import { Noto_Sans_KR, Poetsen_One } from 'next/font/google';
import '../styles/globals.scss';
import '../styles/Home.scss';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poetsenOne = Poetsen_One({
  variable: '--font-display',
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

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${notoSansKr.variable} ${poetsenOne.variable} ${notoSansKr.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
