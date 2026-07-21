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
} from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';
import { TbBrandReactNative } from 'react-icons/tb';

export const skillsInfo = [
  {
    title: 'Language',
    contents: [
      { icon: <FaHtml5 />, describe: 'HTML' },
      { icon: <FaCss3 />, describe: 'CSS' },
      { icon: <SiJavascript />, describe: 'JavaScript' },
      { icon: <SiTypescript />, describe: 'TypeScript' },
      { icon: <SiDart />, describe: 'Dart' },
    ],
  },
  {
    title: 'Frameworks',
    contents: [
      { icon: <FaReact />, describe: 'React' },
      { icon: <RiNextjsFill />, describe: 'Next.js' },
      { icon: <TbBrandReactNative />, describe: 'React Native' },
      { icon: <SiFlutter />, describe: 'Flutter' },
      { icon: null, describe: 'Expo' },
      { icon: null, describe: 'Vite' },
    ],
  },
  {
    title: 'State Management',
    contents: [
      { icon: <SiRecoil />, describe: 'Recoil' },
      { icon: null, describe: 'Zustand' },
      { icon: <SiReactquery />, describe: 'React Query' },
      { icon: null, describe: 'BLoC' },
      { icon: null, describe: 'Provider' },
    ],
  },
  {
    title: 'Styling',
    contents: [
      { icon: <SiTailwindcss />, describe: 'Tailwind' },
      { icon: <FaSass />, describe: 'Sass' },
      { icon: <SiCssmodules />, describe: 'CSS Modules' },
      { icon: <SiStyledcomponents />, describe: 'Styled Component' },
    ],
  },
  {
    title: 'Tools',
    contents: [
      { icon: <SiGoogleanalytics />, describe: 'GA' },
      { icon: <SiFirebase />, describe: 'Firebase' },
      { icon: null, describe: 'Playwright' },
      { icon: null, describe: 'Cursor' },
    ],
  },
  {
    title: 'Deployment',
    contents: [{ icon: <SiVercel />, describe: 'Vercel' }],
  },
];
