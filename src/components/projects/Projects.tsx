'use client';

import '@/styles/components/Projects.scss';

import { projects, ProjectCardData } from '@/mocks/projects';

import { forwardRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import InfoHeader from '../header/InfoHeader';
import ProjectCard from './ProjectCard';
import ReadMe from './ReadMe';
import FilteringButton from './FilteringButton';

const Projects = forwardRef<HTMLDivElement>((_, ref) => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCardData[]>(projects);

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
    <div ref={ref} className="projects-container">
      <InfoHeader title="Projects" className="projects-header" />

      <FilteringButton setFilteredProjects={setFilteredProjects} projects={projects} />

      <div className="projects-carousel-wrapper">
        {canGoPrev && (
          <button
            type="button"
            className="nav-button prev-button"
            aria-label="이전 프로젝트"
            onClick={() => swiperInstance?.slidePrev()}>
            <HiChevronLeft />
          </button>
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
          speed={420}
          watchSlidesProgress
          breakpoints={{
            0: { spaceBetween: 12 },
            768: { spaceBetween: 18 },
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
                projectFeatures={project.projectFeatures}
                projectVideoLink={project.projectVideoLink}
                projectNotionUrl={project.notionUrl}
                projectGithubUrl={project.githubUrl}
                projectVelogUrl={project.velogUrl}
                troubleShootingNotionUrl={project.troubleShootingNotionUrl}
                onClick={() => handleClickProjectCard(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {canGoNext && (
          <button
            type="button"
            className="nav-button next-button"
            aria-label="다음 프로젝트"
            onClick={() => swiperInstance?.slideNext()}>
            <HiChevronRight />
          </button>
        )}
      </div>

      {isProjectCardClicked && (
        <ReadMe
          setIsProjectCardClicked={setIsProjectCardClicked}
          project={filteredProjects[selectedCardIndex]}
        />
      )}
    </div>
  );
});

Projects.displayName = 'Projects';

export default Projects;
