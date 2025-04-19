import '../styles/components/AboutMe.scss';
import { IoPersonSharp } from 'react-icons/io5';
import { FaCalendar } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { RiGraduationCapFill } from 'react-icons/ri';
import InfoHeader from './InfoHeader';

const myInfoData = [
  { title: '이름', content: '김지민', icon: <IoPersonSharp /> },
  { title: '생년월일', content: '1994.05.16', icon: <FaCalendar /> },
  { title: '위치', content: '서울시 동작구', icon: <MdPlace /> },
  { title: '연락처', content: '010-7369-0111', icon: <FaPhone /> },
  { title: '이메일', content: 'zeem_m2@naver.com', icon: <IoIosMail /> },
  {
    title: '학력',
    content: (
      <>
        숙명여자대학교
        <br />
        (작곡과 & 문화예술기획)
      </>
    ),
    icon: <RiGraduationCapFill />,
  },
];
const AboutMe = () => {
  return (
    <div className="about-me-container">
      <InfoHeader title="About Me" className="about-me-header" />
      <div className="about-me-info">
        {myInfoData.map((info, idx) => (
          <div className="about-me-info-item" key={idx}>
            <div className="about-me-info-icon">{info.icon}</div>
            <div className="about-me-info-text-container">
              <span className="about-me-info-title">{info.title}</span>
              <span className="about-me-info-content">{info.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
