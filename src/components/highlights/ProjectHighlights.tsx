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
      <h3 className="readme-section-title">Work &amp; Impact</h3>
      <div className="readme-highlights-list">
        {items.map((item, index) => (
          <HighlightCaseCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
