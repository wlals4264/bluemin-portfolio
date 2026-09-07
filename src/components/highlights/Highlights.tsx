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
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

const Highlights = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="highlights-page">
      <InfoHeader title="Highlights" className="highlights-page-header" />
      <p className="highlights-page-lead">
        더보기로 배경·이슈·성과를 펼칠 수 있고, 프로젝트 &gt; README에서도 같은 내용을 확인할 수
        있습니다.
      </p>

      {highlightProjectOrder.map((projectId) => {
        const items = getHighlightsByProjectId(projectId);
        if (items.length === 0) return null;

        return (
          <RevealSection key={projectId} className="highlights-group">
            <h3 className="highlights-group-title">{highlightProjectLabel[projectId]}</h3>
            <RevealGroup className="highlights-group-list">
              {items.map((item) => (
                <RevealItem key={item.id}>
                  <HighlightCaseCard item={item} compact />
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealSection>
        );
      })}
    </RevealSection>
  );
});

Highlights.displayName = 'Highlights';

export default Highlights;
