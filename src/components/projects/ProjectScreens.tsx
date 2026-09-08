import '@/styles/components/ProjectScreens.scss';

import Image from 'next/image';

interface ProjectScreensProps {
  /** public/ 기준 경로 (예: /images/portfolio/kkuljam) */
  basePath: string;
  count: number;
  alt: string;
  ext?: string;
}

/** README 모달에서 실제 앱 스크린샷을 가로 스크롤 갤러리로 보여준다. */
const ProjectScreens = ({ basePath, count, alt, ext = 'jpg' }: ProjectScreensProps) => {
  const screens = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="project-screens">
      {screens.map((n) => (
        <div className="project-screens-item" key={n}>
          <Image
            src={`${basePath}/screen-${n}.${ext}`}
            alt={`${alt} ${n}`}
            fill
            sizes="(max-width: 768px) 130px, 160px"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectScreens;
