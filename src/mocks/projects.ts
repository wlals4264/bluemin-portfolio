interface ProjectCard {
  title: string;
  date: string;
  projectType: string;
  projectFeatures: string[];
  projectUrl: string;
  projectSkills: string[];
}

const projcect1: ProjectCard = {
  title: 'OlaOla',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'personal',
  projectFeatures: [
    '서버 없이 프론트엔드 기술에 집중하여 진행한 첫 개인 프로젝트',
    '영상 및 이미지 업로드를 위해 브라우저 저장소인 IndexedDB 사용',
    '텍스트 에디터의 이미지 업로드 기능을 input을 이용해 커스텀하여 구현',
    'IndexedDB에 저장된 Blob 객체를 data-set 속성을 활용해 id를 부여하여 게시글 올리기 및 수정 기능 구현',
    '무한 스크롤, 스크롤 스냅, 페이지네이션, 캐러셀 등을 라이브러리 없이 구현',
  ],
  projectUrl: 'https://ola-ola-nine.vercel.app/',
  projectSkills: [
    'React',
    'TypeScript',
    'Recoil',
    'Vite',
    'Styled Component',
    'Tailwind',
    'Firebase Authentication',
    'IndexedDB',
  ],
};

export const projects: ProjectCard[] = [projcect1];
