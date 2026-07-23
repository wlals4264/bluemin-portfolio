'use client';

import type { ExperienceItemData } from '@/mocks/experienceData';

import { FaChevronRight } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

type ExperienceListProps = {
  data: ExperienceItemData[];
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
          <div className="experience-item-head">
            <span className="experience-title">{item.title}</span>
            <span className="experience-date">{item.date}</span>
          </div>
          <span className="experience-sub-title">{item.subTitle}</span>
          <div className="experience-description">
            {item.description.map((desc, i) => (
              <span key={i} className="experience-desc-line">
                <span className="experience-desc-bullet" aria-hidden>
                  –
                </span>
                <span>{desc}</span>
              </span>
            ))}
            {item.linkUrl && (
              <a
                className="experience-link"
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}>
                <span className="experience-link-icon" aria-hidden>
                  <SiVelog />
                </span>
                <span className="experience-link-text">{item.linkLabel ?? '관련 링크'}</span>
                <span className="experience-link-chevron" aria-hidden>
                  <FaChevronRight />
                </span>
              </a>
            )}
          </div>
        </li>
      ))}

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
