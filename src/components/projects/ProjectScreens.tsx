import '@/styles/components/ProjectScreens.scss';

import Image from 'next/image';

interface ProjectScreensProps {
  /** public/ 기준 경로 (예: /images/portfolio/kkuljam) */
  basePath: string;
  /** 확장자 포함 파일명 목록 (예: ['screen-1.jpg', ..., 'demo.gif']) */
  files: string[];
  alt: string;
  /** 세로 폰 스크린샷(기본) 대신 가로형 웹 화면일 때 */
  orientation?: 'portrait' | 'landscape';
}

/** README 모달에서 실제 앱 스크린샷을 가로 스크롤 갤러리로 보여준다. gif는 애니메이션 유지를 위해 next/image를 거치지 않는다. */
const ProjectScreens = ({ basePath, files, alt, orientation = 'portrait' }: ProjectScreensProps) => {
  return (
    <div className={`project-screens${orientation === 'landscape' ? ' is-landscape' : ''}`}>
      {files.map((file, i) => {
        const isGif = file.toLowerCase().endsWith('.gif');
        return (
          <div className="project-screens-item" key={file}>
            {isGif ? (
              // eslint-disable-next-line @next/next/no-img-element -- next/image strips gif animation
              <img src={`${basePath}/${file}`} alt={`${alt} ${i + 1}`} loading="lazy" />
            ) : (
              <Image
                src={`${basePath}/${file}`}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 130px, 160px"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectScreens;
