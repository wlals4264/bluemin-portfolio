'use client';

import '../styles/components/Projects.scss';
import { projects } from '@/mocks/projects';
import InfoHeader from './InfoHeader';
import ProjectCard from './ProjectCard';
import { forwardRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ReadMe from './ReadMe';

const Projects = forwardRef<HTMLDivElement>((_, ref) => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);

  const handleClickProjectCard = (index: number) => {
    setSelectedCardIndex(index);
    setIsProjectCardClicked(true);
  };

  const handleSwiper = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
  };

  return (
    <div ref={ref} className="projects-container">
      <InfoHeader title="Projects" className="projects-header" />

      <div className="projects-carousel-wrapper">
        {currentIndex > 0 && (
          <button className="nav-button prev-button" onClick={() => swiperInstance?.slidePrev()}>
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
          }}>
          {projects.map((project, index) => (
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

          {projects.length % 2 !== 0 && (
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

        {swiperInstance && currentIndex + 2 < projects.length && (
          <button className="nav-button next-button" onClick={() => swiperInstance.slideNext()}>
            <FaChevronRight />
          </button>
        )}
      </div>

      {isProjectCardClicked && (
        <ReadMe setIsProjectCardClicked={setIsProjectCardClicked} project={projects[selectedCardIndex]} />
      )}
    </div>
  );
});

Projects.displayName = 'Projects';

export default Projects;
