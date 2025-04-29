export interface ProjectCard {
  title: string;
  date: string;
  projectType: string;
  projectTitle: string;
  projectFeatures: string[];
  projectUrl: string;
  projectSkills: string[];
  background?: string;
  meaning?: string;
}

const project1: ProjectCard = {
  title: 'OlaOla',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'personal',
  projectTitle: '클라이머들을 위한 사진/영상 업로드 SNS형 커뮤니티 플랫폼',
  projectFeatures: [
    '서버 없이 영상 및 이미지 업로드 기능을 구현하기 위해 브라우저 저장소인 IndexedDB 사용',
    '텍스트 에디터의 이미지 업로드 기능을 input을 이용해 커스텀하여 구현',
    'IndexedDB에 저장된 Blob 객체를 data-set 속성을 활용해 id를 부여하여 서버없이 게시글 수정 기능 구현',
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
  background: '배경',
  meaning: '의미',
};

const project2: ProjectCard = {
  title: 'momo',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'team',
  projectTitle: '간편히 밥친구를 구하기 위한 소규모 모임 & 채팅 사이트',
  projectFeatures: [
    '서버 없이 영상 및 이미지 업로드를 위해 브라우저 저장소인 IndexedDB 사용',
    '텍스트 에디터의 이미지 업로드 기능을 input을 이용해 커스텀하여 구현',
    'IndexedDB에 저장된 Blob 객체를 data-set 속성을 활용해 id를 부여하여 서버없이 게시글 수정 기능 구현',
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
  background: '배경',
  meaning: '의미',
};

const project3: ProjectCard = {
  title: 'MBTI Chat',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'team',
  projectTitle: '간편히 밥친구를 구하기 위한 소규모 모임 & 채팅 사이트',
  projectFeatures: [
    '서버 없이 영상 및 이미지 업로드를 위해 브라우저 저장소인 IndexedDB 사용',
    '텍스트 에디터의 이미지 업로드 기능을 input을 이용해 커스텀하여 구현',
    'IndexedDB에 저장된 Blob 객체를 data-set 속성을 활용해 id를 부여하여 서버없이 게시글 수정 기능 구현',
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
  background: '배경',
  meaning: '의미',
};

export const projects: ProjectCard[] = [project1, project2, project3];
