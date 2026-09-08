import { IoPersonSharp } from 'react-icons/io5';
import { MdPlace } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import { RiGraduationCapFill } from 'react-icons/ri';

export const myInfoData = [
  { title: '이름', content: '김지민', icon: <IoPersonSharp /> },
  { title: '위치', content: '서울시 동작구', icon: <MdPlace /> },
  { title: '이메일', content: 'jimin2eezz@gmail.com', icon: <IoIosMail /> },
  { title: '연락처', content: '010-7369-0111', icon: <FaPhone /> },
  {
    title: '학력',
    content: (
      <>
        숙명여자대학교 작곡과
        <br />
        복수전공 문화예술기획
      </>
    ),
    icon: <RiGraduationCapFill />,
  },
];
