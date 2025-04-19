'use client';

import { projects } from '@/mocks/projects';
import '../styles/components/Projects.scss';
import InfoHeader from './InfoHeader';
import ProjectCard from './ProjectCard';
import { useState } from 'react';

const Projects = () => {
  const [isProjectCardClicked, setIsProjectCardClicked] = useState<boolean>(false);

  const handleClickProjectCard = () => {
    setIsProjectCardClicked(true);
  };

  return (
    <div>
      <InfoHeader title="Projects" className="projects-header" />
      {projects.map((project, index) => {
        return (
          <ProjectCard
            key={index}
            title={project.title}
            date={project.date}
            projectType={project.projectType}
            projectSkills={project.projectSkills}
            projectUrl={project.projectUrl}
            projectFeatures={project.projectFeatures}
            onClick={handleClickProjectCard}
          />
        );
      })}
    </div>
  );
};

export default Projects;
