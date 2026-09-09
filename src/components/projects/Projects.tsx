'use client';

import '@/styles/components/Projects.scss';

import { projects, ProjectCardData } from '@/mocks/projects';

import { forwardRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import type { Swiper as SwiperType } from 'swiper';
import { useReducedMotion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

import InfoHeader from '../header/InfoHeader';
import ProjectCard from './ProjectCard';
import ReadMe from './ReadMe';
import FilteringButton, { getLatestProjects } from './FilteringButton';
import { RevealSection } from '../common/Reveal';
import GlassSurface from '../common/surfaces/GlassSurface';

const Projects = forwardRef<HTMLDivElement>((_, ref) => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Astra 리뷰에서 발견: 카드 자체의 idle/hover 모션은 reduced motion을 이미 따르지만,
  // 캐러셀 슬라이드 전환(Swiper speed)은 별도 경로라 반영되지 않고 있었다.
  const shouldReduceMotion = useReducedMotion();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCardData[]>(() =>
    getLatestProjects(projects),
  );

  const handleClickProjectCard = (index: number) => {
    setSelectedCardIndex(index);
    setIsProjectCardClicked(true);
    window.history.pushState(null, '', window.location.href);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsProjectCardClicked(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    swiperInstance?.slideTo(0, 0);
    setCurrentIndex(0);
  }, [filteredProjects, swiperInstance]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < filteredProjects.length - 1;

  return (
    <RevealSection ref={ref} className="projects-container">
      <InfoHeader title="Projects" className="projects-header" />

      <FilteringButton setFilteredProjects={setFilteredProjects} projects={projects} />

      <div className="projects-carousel-wrapper">
        {canGoPrev && (
          <div className="projects-carousel-nav-slot projects-carousel-nav-slot--prev">
            <GlassSurface
              as="button"
              blur="sm"
              radius="pill"
              className="nav-button"
              aria-label="이전 프로젝트"
              onClick={() => swiperInstance?.slidePrev()}>
              <HiChevronLeft />
            </GlassSurface>
          </div>
        )}

        <Swiper
          className="projects-peek-carousel"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          modules={[Navigation]}
          grabCursor
          centeredSlides
          slidesPerView="auto"
          spaceBetween={20}
          speed={shouldReduceMotion ? 0 : 420}
          watchSlidesProgress
          // Swiper의 breakpoints는 CSS 변수를 받지 못하는 순수 숫자 API다 — 값 자체는
          // foundation.md §2-1 spacing 스케일(12/16/24px)에 맞춰뒀다(18→16으로 스냅).
          // 분기 지점(0/768/1200)은 CSS @media 스케일(480/768/1024/1439)과는 별개로,
          // 캐러셀 카드 폭·peek 비율에 맞춰 튜닝된 값이라 그대로 둔다.
          breakpoints={{
            0: { spaceBetween: 12 },
            768: { spaceBetween: 16 },
            1200: { spaceBetween: 24 },
          }}
          observer
          observeParents>
          {filteredProjects.map((project, index) => (
            <SwiperSlide key={`${project.title}-${index}`}>
              <ProjectCard
                title={project.title}
                date={project.date}
                projectType={project.projectType}
                projectTitle={project.projectTitle}
                projectSkills={project.projectSkills}
                projectUrl={project.projectUrl}
                projectLinks={project.projectLinks}
                projectFeatures={project.projectFeatures}
                projectVideoLink={project.projectVideoLink}
                projectNotionUrl={project.notionUrl}
                projectGithubUrl={project.githubUrl}
                projectVelogUrl={project.velogUrl}
                troubleShootingNotionUrl={project.troubleShootingNotionUrl}
                index={index}
                onClick={() => handleClickProjectCard(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {canGoNext && (
          <div className="projects-carousel-nav-slot projects-carousel-nav-slot--next">
            <GlassSurface
              as="button"
              blur="sm"
              radius="pill"
              className="nav-button"
              aria-label="다음 프로젝트"
              onClick={() => swiperInstance?.slideNext()}>
              <HiChevronRight />
            </GlassSurface>
          </div>
        )}
      </div>

      {isProjectCardClicked && (
        <ReadMe
          setIsProjectCardClicked={setIsProjectCardClicked}
          project={filteredProjects[selectedCardIndex]}
        />
      )}
    </RevealSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
