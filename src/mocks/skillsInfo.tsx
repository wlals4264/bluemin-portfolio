import { FaHtml5, FaCss3, FaReact, FaSass } from 'react-icons/fa6';
import {
  SiJavascript,
  SiTypescript,
  SiRecoil,
  SiTailwindcss,
  SiStyledcomponents,
  SiCssmodules,
  SiVercel,
  SiReactquery,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiGoogleanalytics,
  SiExpo,
  SiVite,
  SiSentry,
} from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';
import { TbBrandReactNative, TbCube, TbPackage, TbChartHistogram } from 'react-icons/tb';

/** react-icons에 없는 브랜드용 인라인 SVG */
const PlaywrightIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
    <path d="M21.5 7.3 13.2 2.7a2.4 2.4 0 0 0-2.4 0L2.5 7.3A2.4 2.4 0 0 0 1.3 9.4v5.2c0 .85.45 1.63 1.2 2.06l8.3 4.6c.74.41 1.66.41 2.4 0l8.3-4.6a2.4 2.4 0 0 0 1.2-2.06V9.4c0-.85-.45-1.63-1.2-2.1ZM12 4.4l7.2 4-3.1 1.72-7.2-4L12 4.4Zm0 15.2-7.2-4V10.8l7.2 4v4.8Zm1.5-6.05-7.2-4 3.05-1.7 7.2 4-3.05 1.7Zm7.2.85-7.2 4v-4.8l7.2-4v4.8Z" />
  </svg>
);

const CursorIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden fill="currentColor">
    <path d="M4 3.5 19.5 12 11 13.8 8.2 20.5 4 3.5Z" />
  </svg>
);

export const skillsInfo = [
  {
    title: 'Language',
    contents: [
      { icon: <SiTypescript />, describe: 'TypeScript' },
      { icon: <SiJavascript />, describe: 'JavaScript' },
      { icon: <SiDart />, describe: 'Dart' },
      { icon: <FaHtml5 />, describe: 'HTML' },
      { icon: <FaCss3 />, describe: 'CSS' },
    ],
  },
  {
    title: 'Frameworks',
    contents: [
      { icon: <RiNextjsFill />, describe: 'Next.js' },
      { icon: <FaReact />, describe: 'React' },
      { icon: <SiFlutter />, describe: 'Flutter' },
      { icon: <TbBrandReactNative />, describe: 'React Native' },
      { icon: <SiVite />, describe: 'Vite' },
    ],
  },
  {
    title: 'State / Data',
    contents: [
      { icon: <SiReactquery />, describe: 'TanStack Query' },
      { icon: null, describe: 'Zustand' },
      { icon: <TbCube />, describe: 'BLoC' },
    ],
  },
  {
    title: 'Quality / Analytics',
    contents: [
      { icon: <PlaywrightIcon />, describe: 'Playwright' },
      { icon: <SiSentry />, describe: 'Sentry' },
      { icon: <SiGoogleanalytics />, describe: 'GA4' },
      { icon: <TbChartHistogram />, describe: 'ECharts' },
      { icon: <CursorIcon />, describe: 'Cursor' },
    ],
  },
  {
    title: 'Styling',
    contents: [
      { icon: <SiTailwindcss />, describe: 'Tailwind' },
      { icon: <FaSass />, describe: 'Sass' },
      { icon: <SiStyledcomponents />, describe: 'Styled Components' },
    ],
  },
  {
    title: 'Deployment',
    contents: [{ icon: <SiVercel />, describe: 'Vercel' }],
  },
  {
    title: 'Also used',
    contents: [
      { icon: <SiRecoil />, describe: 'Recoil' },
      { icon: <TbPackage />, describe: 'Provider' },
      { icon: <SiExpo />, describe: 'Expo' },
      { icon: <SiCssmodules />, describe: 'CSS Modules' },
      { icon: <SiFirebase />, describe: 'Firebase' },
    ],
  },
];
