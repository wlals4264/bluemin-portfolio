import '@/styles/components/ProjectCard.scss';

import { projectTypeLabel } from '@/mocks/projects';

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

  return (
    <article className="project-card-item-container">
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

        {projectUrl && (
          <a className="project-card-link" href={projectUrl} target="_blank" rel="noreferrer">
            <GoLink aria-hidden />
            <span>{projectUrl.replace(/^https?:\/\//, '')}</span>
          </a>
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
    </article>
  );
};

export default ProjectCard;
