import { ReactNode } from 'react';
import '@/styles/Home.scss';

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div>{children}</div>;
}
