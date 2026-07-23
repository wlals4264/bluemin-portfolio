import { IoPersonSharp } from 'react-icons/io5';
import { MdPlace } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import { RiGraduationCapFill } from 'react-icons/ri';

export const myInfoData = [
  { title: '이름', content: '김지민', icon: <IoPersonSharp /> },
  { title: '위치', content: '서울', icon: <MdPlace /> },
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
