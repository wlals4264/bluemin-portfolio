'use client';

import '@/styles/components/Highlights.scss';

import {
  getHighlightsByProjectId,
  highlightProjectLabel,
  highlightProjectOrder,
} from '@/mocks/highlightsData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';
import { HighlightCaseCard } from './HighlightCaseCard';

const Highlights = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="highlights-page">
      <InfoHeader title="Highlights" className="highlights-page-header" />
      <p className="highlights-page-lead">
        더보기로 배경·이슈·성과를 펼칠 수 있고, 프로젝트 &gt; README에서도 같은 내용을 확인할 수
        있습니다.
      </p>

      {highlightProjectOrder.map((projectId) => {
        const items = getHighlightsByProjectId(projectId);
        if (items.length === 0) return null;

        return (
          <section key={projectId} className="highlights-group">
            <h3 className="highlights-group-title">{highlightProjectLabel[projectId]}</h3>
            <div className="highlights-group-list">
              {items.map((item) => (
                <HighlightCaseCard key={item.id} item={item} compact />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
});

Highlights.displayName = 'Highlights';

export default Highlights;
