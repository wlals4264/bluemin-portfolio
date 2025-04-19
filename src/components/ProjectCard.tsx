interface ProjectCardProps {
  title: string;
  date: string;
  projectType: string;
  projectFeatures: string[];
  projectUrl: string;
  projectSkills: string[];
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date,
  projectType,
  projectSkills,
  projectUrl,
  projectFeatures,
  onClick,
}) => {
  return (
    <div className="project-card-container">
      <h2 className="project-card-title">{title}</h2>
      <div className="project-card-info">
        <span className="project-card-info-date">{date}</span>
        <span className={`project-card-info-${projectType}`}>
          {projectType === 'team' ? '팀 프로젝트' : '개인 프로젝트'}
        </span>
      </div>
      <ul className="project-card-features">
        {projectFeatures &&
          projectFeatures.map((feature, index) => {
            return (
              <li key={index} className={`project-card-feature-${index}`}>
                {feature}
              </li>
            );
          })}
      </ul>
      <a href={projectUrl} target="_blank">
        {projectUrl}
      </a>
      <div className="project-card-skills-container">
        {/* map 돌기 */}
        {projectSkills &&
          projectSkills.map((skill, index) => {
            return (
              <span key={index} className={`profject-card-skill-${index}`}>
                {skill}
              </span>
            );
          })}
      </div>
      {/* 모달 열어주기 */}
      <div className="read-me-btn" onClick={onClick}>
        README
      </div>
    </div>
  );
};

export default ProjectCard;
