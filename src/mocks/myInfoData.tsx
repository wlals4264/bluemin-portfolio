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
        숙명여자대학교 작곡과
        <br />
        복수전공 문화예술기획 · 2014.03–2019.02
      </>
    ),
    icon: <RiGraduationCapFill />,
  },
];

/** 학력–개발 사이: 음악학원 근무 후 커리어 전환 */
export const aboutMeNote =
  '작곡과 졸업 후 음악교육을 하려 2021.04~2024.08 은강음악학원에서 피아노·작곡 입시를 가르쳤습니다. 같은 환경에서 성장이 정체된다고 판단해 프론트엔드로 전환했습니다.';
