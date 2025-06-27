import '@/styles/components/ProjectCard.scss';

import { GoLink } from 'react-icons/go';
import { FaBook, FaYoutube, FaGithub } from 'react-icons/fa';
import { RxNotionLogo } from 'react-icons/rx';
import { SiVelog } from 'react-icons/si';
import { IoIosRocket } from 'react-icons/io';
import Link from 'next/link';

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
  return (
    <div className="project-card-item-container">
      <h2 className="project-card-title">{title}</h2>
      <div className="project-card-info">
        <span className="project-card-info-date">{date}</span>
        <span className={`project-card-info-project-type ${projectType}`}>
          {projectType === 'team' ? '팀 프로젝트' : '개인 프로젝트'}
        </span>
      </div>
      <span className="project-card-info-project-title">{projectTitle}</span>
      <ul className="project-card-features">
        {projectFeatures &&
          projectFeatures.map((feature, index) => {
            return (
              <li key={index} className={`project-card-feature-${index}`}>
                - {feature}
              </li>
            );
          })}
      </ul>

      {projectUrl && (
        <div className="project-card-link-container">
          <GoLink />
          <a href={projectUrl} target="_blank">
            {projectUrl}
          </a>
        </div>
      )}

      {troubleShootingNotionUrl && (
        <div className="project-card-trouble-shooting-container">
          <IoIosRocket className="rocket-icon" />
          <a href={troubleShootingNotionUrl} target="_blank">
            Trouble Shooting!!
          </a>
        </div>
      )}

      <div className="project-card-skills-container">
        {projectSkills &&
          projectSkills.map((skill, index) => {
            return (
              <span key={index} className={`project-card-skill-${index}`}>
                {skill}
              </span>
            );
          })}
      </div>

      {/* 모달 열어주기 */}
      <div className="project-card-btn-container">
        <div className="read-me-btn" onClick={onClick}>
          <FaBook />
          README
        </div>
        {projectVideoLink && (
          <Link className="video-btn" href={projectVideoLink} target="blank">
            <FaYoutube />
            Video
          </Link>
        )}
        {projectNotionUrl && (
          <Link className="notion-btn" href={projectNotionUrl} target="blank">
            <RxNotionLogo />
            Notion
          </Link>
        )}
        {projectGithubUrl && (
          <Link className="github-btn" href={projectGithubUrl} target="blank">
            <FaGithub />
            Github
          </Link>
        )}
        {projectVelogUrl && (
          <Link className="velog-btn" href={projectVelogUrl} target="blank">
            <SiVelog />
            Velog Series
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
