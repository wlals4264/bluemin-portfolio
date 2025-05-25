export interface ProjectCard {
  title: string;
  date: string;
  projectType: string;
  projectTitle: string;
  projectFeatures: string[];
  projectUrl?: string;
  projectSkills: string[];
  background?: string[];
  meaning?: string[];
  projectVideoLink?: string;
  mainFeatures?: string;
  notionUrl?: string;
  githubUrl?: string;
  velogUrl?: string;
}

const project1: ProjectCard = {
  title: 'OlaOla',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'personal',
  projectTitle: '클라이머들을 위한 영상 및 사진 기록 SNS 및 정보 공유 커뮤니티 플랫폼',
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
  mainFeatures: '커뮤니티 웹에 필요한 기본적인 CRUD 기능과 무한 스크롤 기반의 피드 형식의 게시판 구현',
  background: [
    '클라이머들이 기록을 남기고 소통할 수 있는 공간을 만들고자 이 프로젝트를 시작하게 되었습니다.',
    '기존에는 인스타그램을 통해 영상이나 사진을 공유하며 개인적인 기록을 남기곤 했지만, 암장 정보나 후기를 체계적으로 공유할 수 있는 별도의 플랫폼이 없어 불편함이 많았습니다. 이러한 점을 개선하고자, 클라이머들이 자신의 기록을 남기는 동시에 암장 정보를 공유하고 소통할 수 있는 웹사이트를 직접 기획하고 개발하게 되었습니다.',
    '이 플랫폼은 인스타그램처럼 간단하게 이미지나 영상을 업로드할 수 있도록 하면서도, 클라이밍에 특화된 기능을 함께 제공합니다. 예를 들어, 난이도와 암장명을 태그로 선택하여 업로드할 수 있으며, 사용자는 이를 기준으로 필터링하거나 검색할 수 있습니다. 또한, 사용하기 쉬운 단순하고 직관적인 UI/UX를 통해 클라이머들이 보다 쉽게 자신의 기록을 관리하고 커뮤니티와 소통할 수 있도록 설계했습니다.',
  ],
  meaning: [
    '이 프로젝트는 처음부터 끝까지 혼자 구현해 본 첫 웹사이트입니다.',
    '프론트엔드 개발자로서 웹사이트에 필요한 기본적인 기능들을 가능한 한 많이 담아보려고 했습니다. 예를 들어, 피드 둘러보기나 내 피드 부분에는 무한 스크롤을 적용하여 전체 게시물을 빠르게 확인할 수 있도록 했고, 암장 정보 게시판은 페이지네이션을 적용하되, 원하는 게시물을 쉽게 찾을 수 있도록 검색 및 필터링 기능을 제공했습니다.',
    '서버 없이 CRUD 기능을 구현하기 위해 indexedDB를 활용하여 직접 데이터베이스 구조를 설계하고 기능을 구현해보았습니다. 이 과정을 통해 웹의 CRUD 동작 원리와 클라이언트 사이드 데이터베이스의 구조에 대한 이해를 깊이 있게 다질 수 있었습니다.',
    '또한, Firebase를 활용해 이메일 로그인과 구글 소셜 로그인 기능을 구현하였고, 카카오 지도 API에 키워드 검색을 커스터마이징하여 클라이밍 암장만 검색될 수 있도록 설정함으로써, 단순한 API 연동을 넘어 사용자 경험을 고려한 기능 구현까지 신경썼습니다.',
    '이외에도 캐러셀, 스크롤 스냅 등 다양한 프론트엔드 기술을 적용해보았고, 댓글, 좋아요 기능을 직접 구현하며 커뮤니티 서비스의 핵심 기능들이 어떻게 동작하는지 실제로 경험할 수 있었던 프로젝트입니다.',
  ],
  notionUrl: 'https://platinum-literature-af9.notion.site/OlaOla-13b9b3c1166f816ab8c1ef869977bfce?pvs=74',
  githubUrl: 'https://github.com/wlals4264/olaola',
};

const project2: ProjectCard = {
  title: 'momo',
  date: '2024.12 ~ 2025.02',
  projectType: 'team',
  projectTitle: '간편히 밥친구를 구할 수 있는 밥친구 구하기 사이트',
  projectFeatures: [
    '밥친구를 구하기 위한 소모임 & 채팅 사이트',
    '로그인 및 회원가입 기능과 프로필 및 모임 관리 기능, 채팅 기능과 같이 주요 기능 구현',
    'Tanstack Query를 사용해 데이터 캐싱과 서버 상태 관리',
    '효율적인 협업을 위해 디자인 시스템 구현 및 공통 컴포넌트 구현',
  ],
  projectUrl: '',
  projectSkills: ['React', 'TypeScript', 'Recoil', 'Tanstack Query', 'Stomp', 'Tailwind', 'DaisyUI', 'Vite'],
  projectVideoLink: 'https://youtu.be/gnk4T6RWXUs',
  background: [
    '혼밥이 싫은 사람들을 위해, 간편하게 밥친구를 구할 수 있는 서비스를 만들고자 했습니다.',
    '이 사이트는 모임 개설, 참여, 승인, 채팅 등 모임을 운영하고 참여하는 데 필요한 핵심 기능을 제공하며, 복잡한 절차 없이 누구나 쉽게 모임을 만들고 참여할 수 있도록 사용자 경험을 최우선으로 고려하여 개발했습니다.',
  ],
  meaning: [
    '처음으로 백엔드 개발자들과 협업하여 진행한 프로젝트로, CORS 설정부터 배포까지 사이트 개발 전반의 프로세스를 함께 경험하며 다양한 이슈를 해결해 나갔습니다. 이 과정에서 직군 간 역할 이해, Git Flow 전략을 기반으로 한 협업 방식, 그리고 효율적인 소통의 중요성을 실제 상황 속에서 체감할 수 있었습니다.',
    '기능 개발 시에는 백엔드 개발자와 함께 사용자 시나리오 기반의 테스트를 진행하며, 어떤 데이터가 필요하고 어떤 구조가 가장 효율적인지 논의했습니다. 이 과정을 통해 프론트엔드뿐 아니라 전체 시스템의 흐름과 API 설계 관점에서도 시야를 넓힐 수 있었습니다.',
    '프론트엔드 팀 내에서는 회원 기능, 주최자/참여자에 따라 다른 마이페이지 제공, 그리고 리팩토링 기간에는 플로팅 버튼 기반 채팅 기능과 웹소켓 연동 구현을 담당했습니다. 또한, Recoil과 Tanstack Query를 함께 사용하며 서버 상태와 클라이언트 상태를 분리 관리하고, 컴포넌트 간 데이터 흐름을 유연하게 설계하는 경험을 할 수 있었습니다.',
    '개발 과정에서는 실제 협업에서 흔히 발생하는 문제들을 경험하며 함께 해결해 나갔습니다.',
    '예를 들어, 이미지 처리 시 초기에는 단순히 프론트에서 URL을 백엔드로 보내는 방식으로 구현했지만, 이는 렌더링 오류로 이어졌고, 이미지 파일을 전달하고 백엔드에서 URL을 생성해 응답하도록 구조를 수정하면서 API 설계에 대한 중요성을 배웠습니다.',
    '또한, 소셜 로그인 구현 시 리다이렉트 URL을 백엔드 URL로 처리해버리는 바람에 인증 실패가 발생했지만, 문제를 인지한 후 프론트/백 간 충분한 커뮤니케이션과 OAuth 흐름에 대한 학습을 통해 해결할 수 있었습니다.',
    '마지막으로, 코드 리뷰와 리팩토링을 통해 더 깔끔하고 재사용 가능한 구조의 코드 작성을 지향하게 되었으며, 프론트엔드 개발자로서 한 단계 성장할 수 있었던 값진 협업 경험이었습니다.',
  ],
  mainFeatures:
    '디자인 시스템(Figma 기반)과 서버 상태 관리(Tanstack Query)을 통해 UI/UX 일관성과 상태 흐름을 최적화. isPending, isSuccess 상태를 버튼 및 모달과 연동하여 사용자 행동에 따른 피드백을 명확히 제공.',
  notionUrl: 'https://skitter-chord-6cc.notion.site/836b52c3253b4803974d1d6b42d99338?pvs=74',
  githubUrl: 'https://github.com/Team-momo-front/momo-front',
};

const project3: ProjectCard = {
  title: 'MBTI Chat',
  date: '2025.03',
  projectType: 'personal',
  projectTitle: '브라우저의 웹소켓 기능을 활용하여 구현한 간단한 채팅 사이트',
  projectFeatures: [
    'STOMP와 같은 라이브러리 없이 순수 브라우저 api 웹소켓을 사용하여 만든 간단한 채팅 사이트',
    '유지보수를 위해 웹소켓 컨트롤러를 만들어 관련 비즈니스 로직을 한 곳에서 관리',
    '간단한 백엔드 소켓 서버 코드 구현',
  ],
  // projectUrl:''
  projectSkills: ['React', 'TypeScript', 'Recoil', 'Tailwind', 'Vite', 'Node.js', 'Web Socket'],
  background: ['순수 웹소켓을 사용하여 채팅 기능을 구현해 본 토이 프로젝트'],
  meaning: [
    '웹소켓을 활용하기 위해 시작한 토이 프로젝트로, 본격적인 기능 공부에 앞서 Polling, SSE, WebSocket과 같은 웹 통신 방식의 차이점을 정리하고, 왜 채팅에 WebSocket이 적합한지 정의할 수 있었습니다.',
    'STOMP나 SockJS 같은 라이브러리를 사용하지 않고 순수 브라우저 API와 Node.js로 직접 웹소켓 서버를 구현하면서, 핸드쉐이크 과정, 클라이언트 연결 관리, 메시지 브로드캐스팅 등 소켓 통신의 핵심 흐름을 이해할 수 있었습니다.',
    '프론트에서는 사용자 접속 및 메시지 전송 흐름을 구현하고, 백엔드에서는 소켓 이벤트를 컨트롤러로 분리하여 유지보수성과 확장성을 고려한 구조 설계에 도전해보았습니다.',
    '프론트엔드 개발자 입장에서 실시간 통신 기능의 구조적 흐름과 네트워크 기반 기술에 대한 이해도를 높일 수 있었던 유의미한 프로젝트였습니다.',
  ],
  mainFeatures: 'STOMP 없이 순수 웹소켓 API를 활용한 실시간 채팅 기능 구현 및 소켓 컨트롤러 구조 설계',
  velogUrl:
    'https://velog.io/@wlals4264/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-MBTI-%EB%9E%9C%EB%8D%A4%EC%B1%84%ED%8C%85',
};

const project4: ProjectCard = {
  title: 'Flobby',
  date: '2025.04 ~ present',
  projectType: 'team',
  projectTitle: '기존 소모임 앱들의 불편함을 개선한 소모임 플랫폼 개발(MVP 진행중)',
  projectFeatures: [
    'MVC 패턴을 도입하여 구조화된 아키텍처를 구현하고, 메인 페이지의 핵심 기능인 지역 변경 기능 개발을 담당',
    '로딩 속도 최적화를 위해 불필요한 비동기 코드를 제거하고 렌더링 성능을 개선',
    'Drag & Drop 기능과 파일 업로더 유틸 클래스를 직접 구현하여 프로젝트 전반에서 재사용 가능하도록 기여',
    '디자이너, 기획자, 앱 및 웹 개발자들과의 유기적인 협업을 통해 기능 개발을 원활히 진행',
  ],
  // projectUrl: '',
  projectSkills: ['React', 'TypeScript', 'Zustand', 'Scss', 'Vite'],
  background: ['기획 및 디자인팀과의 협업 경험을 쌓고, 실무 중심의 팀 프로젝트를 경험하고자 참여한 프로젝트'],
  meaning: [
    '메인 페이지의 핵심 기능을 담당하며, 데이터 가공의 독립성과 컴포넌트 간 재사용성을 높이기 위해 MVC 패턴을 도입하였습니다.',
    '이 과정에서 JavaScript의 클래스 개념을 재정립할 수 있었고, 핵심 데이터를 담당하는 모델과 컨트롤러를 직접 설계 및 구현함으로써 유지보수성과 확장성을 높이는데 기여하였습니다.',
    '또한, 백엔드 개발자와 협업하여 메인 데이터를 제공하는 API와 지역 정보를 제공하는 API의 역할을 분리하는 논의를 주도하였습니다. 기존에는 지역 정보를 가져오기 위해 메인 데이터를 반복 호출해야 하는 구조였으나, 이를 분리함으로써 데이터 독립성을 확보하고 네트워크 리소스를 효율적으로 사용할 수 있는 API 설계를 도입하였습니다. 이로 인해 프론트엔드와 백엔드 간의 의존도를 낮추고, 보다 확장 가능한 구조로 개선할 수 있었습니다.',
  ],
  mainFeatures: 'MVC 아키텍처 기반의 구조화된 메인 페이지 개발에 기여, 지역 기반 데이터 처리',
};

export const projects: ProjectCard[] = [project1, project2, project3, project4];
