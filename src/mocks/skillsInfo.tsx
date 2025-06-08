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
} from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';

export const skillsInfo = [
  {
    title: 'Language',
    contents: [
      { icon: <FaHtml5 />, describe: 'HTML' },
      { icon: <FaCss3 />, describe: 'CSS' },
      { icon: <SiJavascript />, describe: 'JavaScript' },
      { icon: <SiTypescript />, describe: 'TypeScript' },
    ],
  },
  {
    title: 'Frameworks',
    contents: [
      { icon: <FaReact />, describe: 'React' },
      { icon: <RiNextjsFill />, describe: 'Next.js' },
    ],
  },
  {
    title: 'State Management',
    contents: [
      { icon: <SiRecoil />, describe: 'Recoil' },
      { icon: null, describe: 'Zustand' },
      { icon: <SiReactquery />, describe: 'React Query' },
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
  { title: 'Deployment', contents: [{ icon: <SiVercel />, describe: 'Vercel' }] },
];
