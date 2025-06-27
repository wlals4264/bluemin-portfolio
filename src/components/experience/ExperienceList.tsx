type Experience = {
  title: string;
  date: string;
  subTitle: string;
  description: string[];
};

type ExperienceListProps = {
  data: Experience[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const ExperienceList = ({ data, activeIndex, setActiveIndex }: ExperienceListProps) => {
  const tagCount = data.length;

  return (
    <ul className="experience-list">
      {data.map((item, idx) => (
        <li
          key={idx}
          className={`experience-item ${idx === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(idx)}>
          <span className="experience-title">{item.title}</span>
          <span className="experience-date">{item.date}</span>
          <span className="experience-sub-title">{item.subTitle}</span>
          <div className="experience-description">
            {item.description.map((desc, i) => (
              <span key={i}>- {desc}</span>
            ))}
          </div>
        </li>
      ))}

      {/* 인덱스 태그 */}
      <div className="experiences-index-tags">
        {data.map((_, idx) => {
          const offset = (idx - (tagCount - 1) / 2) * 40;

          return (
            <div
              key={idx}
              className={`tag-box ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              style={{ transform: `translateX(${offset}px)` }}
            />
          );
        })}
      </div>
    </ul>
  );
};

export default ExperienceList;
