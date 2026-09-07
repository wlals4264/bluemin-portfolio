import '@/styles/components/ProjectCard.scss';

import { projectTypeLabel, getProjectLinks } from '@/mocks/projects';

import { motion, useReducedMotion } from 'framer-motion';
import { FaBook, FaYoutube, FaGithub } from 'react-icons/fa';
import { RxNotionLogo } from 'react-icons/rx';
import { SiVelog } from 'react-icons/si';
import { GoLink } from 'react-icons/go';
import Link from 'next/link';

const MAX_VISIBLE_FEATURES = 3;

interface ProjectCardProps {
  title: string;
  date: string;
  projectType: string;
  projectTitle: string;
  projectFeatures: string[];
  projectUrl?: string;
  projectLinks?: { label: string; url: string }[];
  projectSkills: string[];
  projectVideoLink?: string;
  projectNotionUrl?: string;
  projectGithubUrl?: string;
  projectVelogUrl?: string;
  troubleShootingNotionUrl?: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date,
  projectType,
  projectTitle,
  projectSkills,
  projectUrl,
  projectLinks,
  projectFeatures,
  projectVideoLink,
  projectNotionUrl,
  projectGithubUrl,
  projectVelogUrl,
  troubleShootingNotionUrl,
  onClick,
}) => {
  const features = projectFeatures ?? [];
  const visibleFeatures = features.slice(0, MAX_VISIBLE_FEATURES);
  const hiddenFeatureCount = Math.max(0, features.length - MAX_VISIBLE_FEATURES);
  const visibleSkills = (projectSkills ?? []).slice(0, 8);
  const hiddenSkillCount = Math.max(0, (projectSkills?.length ?? 0) - visibleSkills.length);
  const links = getProjectLinks({ projectUrl, projectLinks });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card-item-container"
      whileHover={
        shouldReduceMotion ? undefined : { y: -10, scale: 1.02 }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.6 }}>
      <div className="project-card-top">
        <div className="project-card-header">
          <h2 className="project-card-title">{title}</h2>
          <div className="project-card-info">
            <span className="project-card-info-date">{date}</span>
            <span className={`project-card-info-project-type ${projectType}`}>
              {projectTypeLabel(projectType)}
            </span>
          </div>
        </div>

        <p className="project-card-info-project-title">{projectTitle}</p>

        {visibleFeatures.length > 0 && (
          <ul className="project-card-features">
            {visibleFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        {hiddenFeatureCount > 0 && (
          <button type="button" className="project-card-more" onClick={onClick}>
            +{hiddenFeatureCount}개 더보기
          </button>
        )}

        {links.length > 0 && (
          <div className="project-card-links">
            {links.map((link) => (
              <a
                className="project-card-link"
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={link.url}>
                <GoLink aria-hidden />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}

        {troubleShootingNotionUrl && (
          <a
            className="project-card-trouble"
            href={troubleShootingNotionUrl}
            target="_blank"
            rel="noreferrer">
            Trouble Shooting
          </a>
        )}
      </div>

      <div className="project-card-bottom">
        {(visibleSkills.length > 0 || hiddenSkillCount > 0) && (
          <div className="project-card-skills-container">
            {visibleSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
            {hiddenSkillCount > 0 && (
              <span className="project-card-skill-more">+{hiddenSkillCount}</span>
            )}
          </div>
        )}

        <div className="project-card-btn-container">
          <button type="button" className="read-me-btn" onClick={onClick}>
            <FaBook aria-hidden />
            README
          </button>
          {projectVideoLink && (
            <Link className="video-btn" href={projectVideoLink} target="_blank" rel="noreferrer">
              <FaYoutube aria-hidden />
              Video
            </Link>
          )}
          {projectNotionUrl && (
            <Link className="notion-btn" href={projectNotionUrl} target="_blank" rel="noreferrer">
              <RxNotionLogo aria-hidden />
              Notion
            </Link>
          )}
          {projectGithubUrl && (
            <Link className="github-btn" href={projectGithubUrl} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden />
              Github
            </Link>
          )}
          {projectVelogUrl && (
            <Link className="velog-btn" href={projectVelogUrl} target="_blank" rel="noreferrer">
              <SiVelog aria-hidden />
              Velog
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
