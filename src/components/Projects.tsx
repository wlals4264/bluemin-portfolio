'use client';

import '../styles/components/Projects.scss';
import { projects, ProjectCardData } from '@/mocks/projects';

import { forwardRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import InfoHeader from './InfoHeader';
import ProjectCard from './ProjectCard';
import ReadMe from './ReadMe';
import FilteringButton from './FilteringButton';

const Projects = forwardRef<HTMLDivElement>((_, ref) => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectCardData[]>(projects);

  const handleClickProjectCard = (index: number) => {
    setSelectedCardIndex(index);
    setIsProjectCardClicked(true);

    window.history.pushState(null, '', window.location.href);
  };

  const handleSwiper = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
  };

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth >= 1028 ? 2 : 1);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  // 뒤로가기 누르면 모달 닫히기
  useEffect(() => {
    const handlePopState = () => {
      setIsProjectCardClicked(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div ref={ref} className="projects-container">
      <InfoHeader title="Projects" className="projects-header" />

      <FilteringButton
        setFilteredProjects={setFilteredProjects}
        projects={projects}
      />

      <div className="projects-carousel-wrapper">
        {currentIndex > 0 && (
          <button
            className="nav-button prev-button"
            onClick={() => swiperInstance?.slidePrev()}
          >
            <FaChevronLeft />
          </button>
        )}

        <Swiper
          onSwiper={handleSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          modules={[Navigation]}
          allowTouchMove={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
            1028: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },
            1440: {
              slidesPerView: 2,
              spaceBetween: 30,
              slidesPerGroup: 2,
            },
          }}
        >
          {filteredProjects.map((project, index) => (
            <SwiperSlide key={index} className="swiper-slide">
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
                onClick={() => handleClickProjectCard(index)}
              />
            </SwiperSlide>
          ))}

          {filteredProjects.length % 2 !== 0 && (
            <SwiperSlide key="empty">
              <div style={{ visibility: 'hidden' }}>
                <ProjectCard
                  title=""
                  date=""
                  projectType="personal"
                  projectTitle=""
                  projectSkills={[]}
                  projectUrl=""
                  projectFeatures={[]}
                  projectVideoLink=""
                  onClick={() => {}}
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {swiperInstance &&
          currentIndex + slidesPerView < filteredProjects.length && (
            <button
              className="nav-button next-button"
              onClick={() => swiperInstance.slideNext()}
            >
              <FaChevronRight />
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
