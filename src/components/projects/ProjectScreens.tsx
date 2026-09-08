'use client';

import '@/styles/components/ProjectScreens.scss';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { LuExpand } from 'react-icons/lu';

interface ProjectScreensProps {
  /** public/ 기준 경로 (예: /images/portfolio/kkuljam) */
  basePath: string;
  /** 확장자 포함 파일명 목록 (예: ['screen-1.jpg', ..., 'demo.gif']) */
  files: string[];
  alt: string;
  /** 세로 폰 스크린샷(기본) 대신 가로형 웹 화면일 때 */
  orientation?: 'portrait' | 'landscape';
}

/** README 모달에서 실제 앱 스크린샷을 가로 스크롤 갤러리로 보여준다. 클릭하면 크게 볼 수 있다.
 * gif는 애니메이션 유지를 위해 next/image를 거치지 않고, mp4는 gif보다 훨씬 고화질로
 * 원본 화면 녹화를 그대로 재생한다(자동재생·반복·무음). */
const ProjectScreens = ({ basePath, files, alt, orientation = 'portrait' }: ProjectScreensProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % files.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + files.length) % files.length));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex, files.length]);

  return (
    <>
      <div className={`project-screens${orientation === 'landscape' ? ' is-landscape' : ''}`}>
        {files.map((file, i) => {
          const isGif = file.toLowerCase().endsWith('.gif');
          const isVideo = file.toLowerCase().endsWith('.mp4');
          return (
            <button
              type="button"
              className="project-screens-item"
              key={file}
              onClick={() => setOpenIndex(i)}
              aria-label={`${alt} ${i + 1} 크게 보기`}>
              {isVideo ? (
                <video
                  src={`${basePath}/${file}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : isGif ? (
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
              <span className="project-screens-badge" aria-hidden="true">
                <LuExpand />
              </span>
            </button>
          );
        })}
      </div>

      {openIndex !== null &&
        createPortal(
          <div className="project-screens-lightbox" onClick={() => setOpenIndex(null)}>
            <button
              type="button"
              className="project-screens-lightbox-close"
              onClick={() => setOpenIndex(null)}
              aria-label="닫기">
              <IoIosClose />
            </button>

            {files.length > 1 && (
              <>
                <button
                  type="button"
                  className="project-screens-lightbox-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex((openIndex - 1 + files.length) % files.length);
                  }}
                  aria-label="이전 화면">
                  <IoChevronBack />
                </button>
                <button
                  type="button"
                  className="project-screens-lightbox-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex((openIndex + 1) % files.length);
                  }}
                  aria-label="다음 화면">
                  <IoChevronForward />
                </button>
              </>
            )}

            {/* gif·정적 이미지 모두 next/image 최적화 없이 원본으로 보여준다 (다양한 비율에 그대로 대응) */}
            <div className="project-screens-lightbox-frame" onClick={(e) => e.stopPropagation()}>
              {files[openIndex].toLowerCase().endsWith('.mp4') ? (
                <video
                  key={files[openIndex]}
                  className="project-screens-lightbox-media"
                  src={`${basePath}/${files[openIndex]}`}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="project-screens-lightbox-media"
                  src={`${basePath}/${files[openIndex]}`}
                  alt={`${alt} ${openIndex + 1}`}
                />
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ProjectScreens;
