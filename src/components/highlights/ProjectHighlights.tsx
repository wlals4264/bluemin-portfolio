'use client';

import { getHighlightsByProjectId } from '@/mocks/highlightsData';
import type { ProjectHighlightId } from '@/mocks/highlightsData';

import { HighlightCaseCard } from './HighlightCaseCard';

type ProjectHighlightsProps = {
  projectId: ProjectHighlightId;
};

export default function ProjectHighlights({ projectId }: ProjectHighlightsProps) {
  const items = getHighlightsByProjectId(projectId);
  if (items.length === 0) return null;

  return (
    <section className="readme-section highlights-box">
      <h3 className="readme-section-title">핵심 결정</h3>
      <p className="readme-highlights-lead">
        이 프로젝트에서 임팩트 있는 기술·제품 결정입니다. 더보기로 배경·이슈·성과를 펼칠 수 있습니다.
      </p>
      <div className="readme-highlights-list">
        {items.map((item) => (
          <HighlightCaseCard key={item.id} item={item} compact />
        ))}
      </div>
    </section>
  );
}
