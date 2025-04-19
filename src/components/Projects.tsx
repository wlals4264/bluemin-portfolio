'use client';

import { projects } from '@/mocks/projects';
import InfoHeader from './InfoHeader';
import ProjectCard from './ProjectCard';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import '../styles/components/Projects.scss';

const Projects = () => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickProjectCard = () => {
    setIsProjectCardClicked(true);
  };

  const handleSwiper = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
  };

  return (
    <div className="projects-container">
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
          spaceBetween={20}
          slidesPerView={2}
          slidesPerGroup={2}
          allowTouchMove={true}>
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
                onClick={handleClickProjectCard}
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

        {/* <div className="projects-cards-container">
          {projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                title={project.title}
                date={project.date}
                projectType={project.projectType}
                projectTitle={project.projectTitle}
                projectSkills={project.projectSkills}
                projectUrl={project.projectUrl}
                projectFeatures={project.projectFeatures}
                onClick={handleClickProjectCard}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Projects;
