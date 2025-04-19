import '../styles/components/Skills.scss';
import InfoHeader from './InfoHeader';
import { FaHtml5, FaCss3, FaReact, FaSass } from 'react-icons/fa6';
import {
  SiJavascript,
  SiTypescript,
  SiRecoil,
  SiTailwindcss,
  SiStyledcomponents,
  SiCssmodules,
  SiVercel,
} from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';

const skillsInfo = [
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

const Skills = () => {
  return (
    <div className="skills-container">
      <InfoHeader title="Skills" className="skills-header" />
      <div className="skills-list">
        {skillsInfo.map((info, index) => (
          <div className="skill-section" key={index}>
            {/* <div className="skill-items"> */}
            <div className="skill-title">
              <span>{info.title}</span>
            </div>
            {info.contents.map((content, idx) => (
              <span className={`skill-item ${content.describe.toLocaleLowerCase().replace(/[\s.]/g, '-')}`} key={idx}>
                <span className="skill-item-icon">{content.icon}</span>
                <span>{content.describe}</span>
              </span>
            ))}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
