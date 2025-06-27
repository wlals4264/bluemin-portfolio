export interface ProjectCardData {
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
  troubleShootingNotionUrl?: string;
}

const project1: ProjectCardData = {
  title: 'OlaOla',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'personal',
  projectTitle: '클라이머들을 위한 영상 및 사진 기록 커뮤니티 플랫폼',
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
  troubleShootingNotionUrl:
    'https://platinum-literature-af9.notion.site/OlaOla-Trouble-Shooting-21f9b3c1166f80ec8ce5f0ecb613910e',
};

const project2: ProjectCardData = {
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
    '처음으로 백엔드 개발자들과 협업하여 진행한 프로젝트로, CORS 설정부터 배포까지 사이트 개발 전반의 프로세스를 함께 경험하며 다양한 이슈를 해결해 나갔습니다. 이 과정에서 직군 간 역할 이해, Git Flow 전략을 기반으로 한 협업 방식, 그리고 효율적인 소통의 중요성을 체감할 수 있었습니다.',
    '기능 개발 시에는 백엔드 개발자와 함께 사용자 시나리오 기반의 테스트를 진행하며, 어떤 데이터가 필요하고 어떤 구조가 가장 효율적인지 논의했습니다. 이 과정을 통해 프론트엔드뿐 아니라 전체 시스템의 흐름과 API 설계 관점에서도 시야를 넓힐 수 있었습니다.',
    '프론트엔드 팀 내에서는 회원 기능, 주최자/참여자에 따라 다른 마이페이지 제공, 그리고 리팩토링 기간에는 플로팅 버튼을 통해 진입 가능한 채팅 기능과 웹소켓 연동 구현을 담당하였습니다. MVP기간(약 3주)과 리팩토링 기간(약 1주 반)동안 주요 기능 5가지 중 3가지를 담당하였고 수치적으로 프론트 팀 기능 개발에 약 60% 정도의 기여를 하였습니다.',
    'Recoil과 React Query를 함께 사용하며 클라이언트 상태와 서버 상태를 분리하여 관리하였고, 컴포넌트 간 데이터 흐름을 유연하게 설계하면서 프로젝트 전반적으로 유저들이 서버 상태를 시각적으로 인지할 수 있도록 UI를 제공하여 유저 경험을 향상시키기 위해 노력하였습니다.',
    '또한, 개발 과정동안 다양한 문제들을 경험하며 동료들과 함께 해결해 나갔습니다.',
    '예를 들어, 이미지 처리 시 초기에는 단순히 프론트에서 URL을 백엔드로 보내는 방식으로 구현했지만, 이는 렌더링 오류로 이어졌고, 이미지 파일을 전달하고 백엔드에서 URL을 생성해 응답하도록 구조를 수정하면서 API 설계에 대한 중요성을 배웠습니다.',
    '또한, 소셜 로그인 구현 시 리다이렉트 URL을 백엔드 URL로 처리하여 구현 중 문제가 발생했지만, 백엔드 담당자와 프로세스 점검 및 코드 리뷰와 같은 프론트/백 간 충분한 커뮤니케이션과 OAuth 흐름에 대한 학습을 통해 해당 문제를 해결할 수 있었습니다.',
    '마지막으로, 팀 내 코드 리뷰를 통한 리팩토링을 통해 더 깔끔하고 재사용 가능한 구조의 확장성 있고 유지 보수성이 높은 코드 작성을 지향하게 되었으며, 프론트엔드 개발자로서 한 단계 성장할 수 있었던 값진 프로젝트였습니다.',
    '지속적인 배포는 뜻이 맞지 않아 진행하지 못했지만 좋은 팀원들을 만나 함께 밤새 문제를 극복해 나가는 과정에서 개발의 순수한 즐거움 또한 얻었습니다.',
  ],
  mainFeatures:
    '디자인 시스템(Figma 기반)과 서버 상태 관리(Tanstack Query)을 통해 UI/UX 일관성과 상태 흐름을 최적화. isPending, isSuccess 상태를 버튼 및 모달과 연동하여 사용자 행동에 따른 피드백을 명확히 제공.',
  notionUrl: 'https://skitter-chord-6cc.notion.site/836b52c3253b4803974d1d6b42d99338?pvs=74',
  githubUrl: 'https://github.com/Team-momo-front/momo-front',
  troubleShootingNotionUrl:
    'https://platinum-literature-af9.notion.site/momo-Trouble-Shooting-21f9b3c1166f8092a39bc4cc2c3e44ea?pvs=73',
};

const project3: ProjectCardData = {
  title: 'MBTI Chat',
  date: '2025.03',
  projectType: 'personal',
  projectTitle: '브라우저의 웹소켓 기능을 활용하여 구현한 간단한 채팅 사이트',
  projectFeatures: [
    'STOMP와 같은 라이브러리 없이 순수 브라우저 api 웹소켓을 사용하여 만든 간단한 채팅 사이트',
    '유지보수를 위해 웹소켓 컨트롤러를 만들어 관련 비즈니스 로직을 한 곳에서 관리',
    '간단한 백엔드 소켓 서버 코드 구현',
  ],
  projectUrl: 'https://mbti-chat-gamma.vercel.app/',
  projectSkills: ['React', 'TypeScript', 'Recoil', 'Tailwind', 'Vite', 'Node.js', 'Web Socket'],
  background: ['순수 웹소켓을 사용하여 채팅 기능을 구현해 본 토이 프로젝트'],
  meaning: [
    '웹소켓을 활용하기 위해 시작한 토이 프로젝트로, Polling, SSE, WebSocket과 같은 웹 통신 방식의 차이점을 정리하고, WebSocket이 실시간 채팅에 적합한 이유를 정의할 수 있었습니다.',
    'STOMP나 SockJS 같은 라이브러리를 사용하지 않고 순수 브라우저 API와 Node.js로 직접 웹소켓 서버를 구현하면서, 핸드쉐이크 과정, 클라이언트 연결 관리, 메시지 브로드캐스팅 등 소켓 통신의 핵심 흐름을 이해할 수 있었습니다.',
    '프론트에서는 사용자 접속 및 메시지 전송 흐름을 구현하고, 소켓 이벤트를 컨트롤러로 분리하여 유지보수성과 확장성을 고려하였습니다.',
    '프론트엔드 개발자 입장에서 실시간 통신 기능의 구조적 흐름과 네트워크 기반 기술에 대한 이해도를 높일 수 있었던 유의미한 프로젝트였습니다.',
  ],
  mainFeatures: '라이브러리 없이 순수 웹소켓 API를 활용한 실시간 채팅 기능 구현 및 소켓 컨트롤러 구조 설계',
  velogUrl:
    'https://velog.io/@wlals4264/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-MBTI-%EB%9E%9C%EB%8D%A4%EC%B1%84%ED%8C%85',
  troubleShootingNotionUrl:
    'https://velog.io/@wlals4264/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-MBTI-%EB%9E%9C%EB%8D%A4%EC%B1%84%ED%8C%85',
};

const project4: ProjectCardData = {
  title: 'Flobby',
  date: '2025.04 ~ 7월 중 1차 MVP 완료 예정',
  projectType: 'team',
  projectTitle: '기존 소모임 앱들의 불편함을 개선한 지역 기반 모임 플랫폼(출시 예정)',
  projectFeatures: [
    'MVP 핵심기능인 메인 페이지의 지역 선택 기능 및 선택된 지역에 따라 모임 목록 렌더링 기능 구현 담당',
    '기존 컴포넌트 간 의존성과 비효율적인 API 호출 구조를 개선하기 위해 MVC 패턴을 도입하고, class 기반의 모델 및 컨트롤러를 직접 설계 및 구현하여 코드의 일관성과 확장성 확보',
    '프로젝트 초반에 구현된 API 연동 로직을 새로운 MVC 구조에 맞게 리팩토링하여 구조적 통일성과 유지보수성을 높임',
    '모임 등록 페이지 내 이미지 업로더, 지역/카테고리/인원 선택 등 주요 컴포넌트를 구현하고, 이 과정에서 Drag & Drop 유틸과 파일 업로드 로직을 분리하여 재사용 가능한 유틸 클래스로 개발',
    '디자이너, 기획자, 앱 개발 파트와 적극적인 커뮤니케이션을 통해 작업 범위를 조율하고, 기획 의도와 실제 구현 간의 차이를 최소화하며 기능 개발 진행중',
  ],
  // projectUrl: '',
  projectSkills: ['React', 'TypeScript', 'Zustand', 'Scss', 'Vite'],
  background: ['기획 및 디자인팀과의 협업 경험을 쌓고, 실무 중심의 팀 프로젝트를 경험하고자 참여한 프로젝트'],

  meaning: [
    '1차 MVP 기간 도중 합류한 프로젝트로, 우선순위 1순위로 선정된 9개 기능 중 이미 개발이 완료된 3개를 제외한 6개의 기능 구현을 맡아 팀원들과 파트를 나누어 협업하고 있습니다. 각 기능은 퍼블리싱, API 연동(Model, Controller 구현), 포지셔닝 등의 세부 작업으로 분할하여 효율적으로 진행 중입니다.',
    '모든 데이터가 지역 기반으로 노출되는 프로젝트에서 메인 페이지의 핵심 기능인 지역 선택 컴포넌트 구현을 전담하였으며, 선택된 지역에 따라 동적으로 메인 페이지의 모임 목록을 불러오는 API 연동을 담당하였습니다.',
    '모임 등록 페이지에서는 이미지 업로더, 카테고리 및 지역 선택, 인원 선택 등의 UI 컴포넌트를 구현하였고, 특히 이미지 업로더는 파일 업로드 기능과 Drag & Drop 유틸 클래스를 분리하여 재사용성과 유지 보수성을 높였습니다.',
    '기존 코드에서는 API 호출 로직이 비효율적으로 분산되어 있었고, 컴포넌트 간 의존도가 높았습니다. 이를 개선하기 위해 프로젝트 전반에 걸쳐 MVC 패턴을 도입하고, JavaScript의 class 기반 모델과 컨트롤러를 직접 설계 및 구현하였습니다.',
    '합류 이전에 구현되어 있던 API 연동 부분도 신규 설계한 모델 및 컨트롤러 구조로 리팩토링하여 코드 일관성과 확장성을 확보하였습니다.',
    '앱 개발 파트와 프론트엔드 파트가 동시에 진행되는 프로젝트 특성상, 기획 및 디자인 의도와 백엔드 API 간의 정합성을 수시로 점검하는 것이 중요했습니다. 이를 위해 전체 개발 프로세스 초기에 백엔드가 작성한 API 명세서를 바탕으로 각 기능별로 필요한 데이터가 누락되거나 과도하게 포함되지 않았는지 사전 검토하는 프로세스를 제안하고 도입하였습니다. 이 과정에서 다른 개발 파트와 긴밀히 소통하며 요구 사항을 명확히 정리하고, 실제 기획 의도에 맞는 데이터 설계를 유도함으로써 개발 중 반복적인 수정이나 충돌을 줄이고 전체 개발 효율을 높이는 데 기여했습니다.',
  ],
  mainFeatures: 'MVC 아키텍처 기반의 구조화된 메인 페이지 개발에 기여, 지역 기반 데이터 처리',
};

const project5: ProjectCardData = {
  title: 'Portfolio Web Site',
  date: '2025.03 ~ 2025.05',
  projectType: 'personal',
  projectTitle: '포트폴리오 웹사이트 구축',
  projectFeatures: [
    'Next.js 13의 App Router 기능을 활용하여 최신 라우팅 방식 적용',
    '컴포넌트 단위로 구조화하여 재사용성과 유지보수성 향상',
  ],
  projectUrl: 'https://bluemin-portfolio.vercel.app/',
  projectSkills: ['Next.js', 'TypeScript', 'Scss', 'Vite', 'Swipe'],
  background: [
    '포트폴리오 웹사이트 구축을 통해 최신 프레임워크의 기능을 학습하고 적용하고자 하였으며, App Router 중심의 구조를 사용하여 동적 라우팅과 레이아웃 관리에 대한 이해를 높였다.',
    '컴포넌트 단위 설계와 재사용 가능한 UI 구성으로 유지보수성과 확장성을 고려하여 설계하였다.',
  ],
  meaning: [
    'Next.js 13의 App Router와 파일 기반 라우팅 구조 학습 및 서버 컴포넌트와 클라이언트 컴포넌트의 분리 개념을 이해할 수 있었던 프로젝트',
    '초기 개발 속도를 높이기 위해 팀 프로젝트에서 활용되었던 Swiper.js를 비롯한 UI 라이브러리를 적극 활용',
    'SEO는 완전히 구현하지는 못했지만, 서버 컴포넌트 기반 구조에서 어떻게 확장할 수 있을지에 대한 방향을 잡을 수 있었고 관련해서 리팩토링 예정',
  ],
  mainFeatures: 'Next.js를 통해 App Router 기반의 폴더 구조로 설계된 포트폴리오 사이트 구현',
};

export const projects: ProjectCardData[] = [project1, project2, project3, project4, project5];
