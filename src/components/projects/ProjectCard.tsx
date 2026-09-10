import '@/styles/components/ProjectCard.scss';

import { projectTypeLabel, projectTypeTone, projectTypeIcon, getProjectLinks } from '@/mocks/projects';

import { motion, useReducedMotion } from 'framer-motion';
import { FaBook, FaYoutube, FaGithub } from 'react-icons/fa';
import { RxNotionLogo } from 'react-icons/rx';
import { SiVelog } from 'react-icons/si';
import { GoLink } from 'react-icons/go';

import GlassSurface from '@/components/common/surfaces/GlassSurface';
import Badge from '@/components/common/badges/Badge';
import FeatureList from '@/components/common/lists/FeatureList';
import Icon3D from '@/components/common/media/Icon3D';
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';

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
  /** 카드마다 살짝 다른 타이밍으로 둥둥 뜨는 유휴 애니메이션을 주기 위한 순번 */
  index?: number;
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
  index = 0,
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
      // 화면이 평면적으로 보이지 않도록 카드가 아주 살짝 둥둥 떠 있는 유휴 애니메이션을 준다.
      // whileHover/whileTap에 각각 transition을 직접 실어서 idle 루프와 서로 간섭하지 않게 한다.
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -6, 0],
              transition: {
                duration: 6 + (index % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (index % 4) * 0.4,
              },
            }
      }
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -10, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.6 } }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.6 }}>
      <div className="project-card-top">
        <div className="project-card-header">
          <h2 className="project-card-title">{title}</h2>
          <div className="project-card-info">
            <span className="project-card-info-date">{date}</span>
            <Icon3D
              src={icon3dAssetsByKey[projectTypeIcon(projectType)].src}
              alt=""
              size="sm"
              className="project-card-type-icon"
            />
            <Badge tone={projectTypeTone(projectType)}>{projectTypeLabel(projectType)}</Badge>
          </div>
        </div>

        <p className="project-card-info-project-title">{projectTitle}</p>

        <FeatureList features={visibleFeatures} />

        {hiddenFeatureCount > 0 && (
          <GlassSurface as="button" blur="sm" radius="pill" className="project-card-more" onClick={onClick}>
            +{hiddenFeatureCount}개 더보기
          </GlassSurface>
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
              <Badge key={skill} variant="chip" tone="accent">
                {skill}
              </Badge>
            ))}
            {hiddenSkillCount > 0 && (
              <Badge variant="chip" tone="neutral">
                +{hiddenSkillCount}
              </Badge>
            )}
          </div>
        )}

        <div className="project-card-btn-container">
          <GlassSurface
            as="button"
            blur="md"
            tone="accent"
            radius="pill"
            className="project-card-action"
            onClick={onClick}>
            <FaBook aria-hidden />
            README
          </GlassSurface>
          {projectVideoLink && (
            <GlassSurface
              as="a"
              blur="md"
              radius="pill"
              className="project-card-action"
              href={projectVideoLink}
              target="_blank"
              rel="noreferrer">
              <FaYoutube aria-hidden />
              Video
            </GlassSurface>
          )}
          {projectNotionUrl && (
            <GlassSurface
              as="a"
              blur="md"
              radius="pill"
              className="project-card-action"
              href={projectNotionUrl}
              target="_blank"
              rel="noreferrer">
              <RxNotionLogo aria-hidden />
              Notion
            </GlassSurface>
          )}
          {projectGithubUrl && (
            <GlassSurface
              as="a"
              blur="md"
              radius="pill"
              className="project-card-action"
              href={projectGithubUrl}
              target="_blank"
              rel="noreferrer">
              <FaGithub aria-hidden />
              Github
            </GlassSurface>
          )}
          {projectVelogUrl && (
            <GlassSurface
              as="a"
              blur="md"
              radius="pill"
              className="project-card-action"
              href={projectVelogUrl}
              target="_blank"
              rel="noreferrer">
              <SiVelog aria-hidden />
              Velog
            </GlassSurface>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
