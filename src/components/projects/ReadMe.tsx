'use client';

import '@/styles/components/ReadMe.scss';

import { ProjectCardData, projectTypeLabel, getProjectLinks } from '@/mocks/projects';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';

import ProjectHighlights from '@/components/highlights/ProjectHighlights';

interface ReadMeProps {
  setIsProjectCardClicked: (value: boolean) => void;
  project: ProjectCardData;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.9, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 32,
    scale: 0.94,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const reducedPanelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const ReadMe = ({ setIsProjectCardClicked, project }: ReadMeProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleExitComplete = () => {
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

  const links = getProjectLinks(project);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          className="read-me-modal-wrapper"
          onClick={handleCloseModal}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <motion.div
            className="read-me-container"
            onClick={(e) => e.stopPropagation()}
            variants={shouldReduceMotion ? reducedPanelVariants : panelVariants}
            style={{ transformPerspective: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="readme-project-title">
            <header className="read-me-header">
              <span className="read-me-header-label">Project detail</span>
              <button
                type="button"
                className="close-modal-btn"
                onClick={handleCloseModal}
                aria-label="닫기">
                <IoIosClose />
              </button>
            </header>

            <main className="info-box">
              <div className="read-me-title-box">
                <h2 id="readme-project-title" className="read-me-title">
                  {project.title}
                </h2>
                <div className="read-me-title-info-data">
                  <span className="read-me-date">{project.date}</span>
                  <span className={`read-me-project-type ${project.projectType}`}>
                    {projectTypeLabel(project.projectType)}
                  </span>
                </div>
                {project.projectTitle && (
                  <p className="read-me-subtitle">{project.projectTitle}</p>
                )}
              </div>

              <div className="read-me-content-box">
                {links.length > 0 && (
                  <section className="readme-section deployment-url-box">
                    <h3 className="readme-section-title">링크</h3>
                    <div className="readme-link-list">
                      {links.map((link) => (
                        <a
                          className="readme-link"
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          key={link.url}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                <section className="readme-section summary-box">
                  <h3 className="readme-section-title">요약</h3>
                  {project.projectFeatures && project.projectFeatures.length > 0 && (
                    <ul className="project-card-features">
                      {project.projectFeatures.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  {project.mainFeatures && (
                    <p className="project-card-main-features">{project.mainFeatures}</p>
                  )}
                </section>

                {project.background && project.background.length > 0 && (
                  <section className="readme-section background-box">
                    <h3 className="readme-section-title">배경</h3>
                    <div className="readme-prose">
                      {project.background.map((background) => (
                        <p key={background}>{background}</p>
                      ))}
                    </div>
                  </section>
                )}

                {project.meaning && project.meaning.length > 0 && (
                  <section className="readme-section meaning-box">
                    <h3 className="readme-section-title">역할 · 기여</h3>
                    <ul className="readme-contrib-list">
                      {project.meaning.map((meaning) => (
                        <li key={meaning}>{meaning}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.highlightProjectId && (
                  <ProjectHighlights projectId={project.highlightProjectId} />
                )}

                {project.projectSkills && project.projectSkills.length > 0 && (
                  <section className="readme-section skills-box">
                    <h3 className="readme-section-title">기술 스택</h3>
                    <div className="skills-content-box">
                      {project.projectSkills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReadMe;
