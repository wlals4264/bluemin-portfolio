type ExperienceItemProps = {
  title: string;
  date: string;
  subTitle: string;
  description: string[];
  isActive: boolean;
};

const ExperienceItem = ({ title, date, subTitle, description, isActive }: ExperienceItemProps) => {
  return (
    <li className={`experience-item ${isActive ? 'active' : ''}`}>
      <span className="experience-title">{title}</span>
      <span className="experience-date">{date}</span>
      <span className="experience-sub-title">{subTitle}</span>
      <div className="experience-description">
        {description.map((desc, i) => (
          <span key={i}>{desc}</span>
        ))}
      </div>
    </li>
  );
};

export default ExperienceItem;
