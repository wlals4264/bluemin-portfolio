'use client';

import '@/styles/components/ReadMe.scss';

import { ProjectCardData, projectTypeLabel } from '@/mocks/projects';

import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

interface ReadMeProps {
  setIsProjectCardClicked: (value: boolean) => void;
  project: ProjectCardData;
}
const ReadMe = ({ setIsProjectCardClicked, project }: ReadMeProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsProjectCardClicked(false);

    window.history.back();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="read-me-modal-wrapper" onClick={handleCloseModal}>
      <div className="read-me-container" onClick={(e) => e.stopPropagation()}>
        <div className="read-me-header">
          <span>readme.md</span>
          <div className="close-modal-btn" onClick={handleCloseModal}>
            <IoIosClose />
          </div>
        </div>

        <main className="info-box">
          <div className="read-me-title-box">
            <span className="read-me-title">{project.title}</span>
            <div className="read-me-title-info-data">
              <span className="read-me-date">{project.date}</span>
              <span className={`read-me-project-type ${project.projectType}`}>
                ({projectTypeLabel(project.projectType)})
              </span>
            </div>
          </div>

          <div className="read-me-content-box">
            {project?.projectUrl && (
              <div className="deployment-url-box">
                <span className="deployment-url-title">🔗 Deployment URL</span>
                <a href={project?.projectUrl} target="_blank">
                  {project?.projectUrl}
                </a>
              </div>
            )}

            <div className="summary-box">
              <span className="summary-title">📌 Summary</span>
              <div className="summary-content">
                <span className="project-title">{project.projectTitle}</span>
                <ul className="project-card-features">
                  {project.projectFeatures &&
                    project.projectFeatures.map((feature, index) => {
                      return (
                        <li key={index} className={`project-card-feature-${index}`}>
                          {feature}
                        </li>
                      );
                    })}
                </ul>
                {project.mainFeatures && (
                  <p className="project-card-main-features">{project.mainFeatures}</p>
                )}
              </div>
            </div>

            <div className="background-box">
              <span className="background-title">🤔 Background</span>
              <div className="background-content">
                <div className="background-text">
                  {project.background?.map((background, index) => {
                    return (
                      <span key={index} className="background-row">
                        {background}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="meaning-box">
              <span className="meaning-title">🔍 Meaning</span>
              <div className="meaning-content">
                <div className="meaning-text">
                  {project.meaning?.map((meaning, index) => {
                    return (
                      <span key={index} className="meaning-row">
                        {meaning}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="skills-box">
              <span className="skills-title">🔨 Technology Stack(s)</span>
              <div className="skills-content-box">
                {project.projectSkills &&
                  project.projectSkills.map((skill, index) => {
                    return (
                      <span key={index} className={`skill-${index}`}>
                        {skill}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReadMe;
