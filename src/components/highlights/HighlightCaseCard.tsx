'use client';

import '@/styles/components/Highlights.scss';

import type { HighlightCase } from '@/mocks/highlightsData';

import { useState } from 'react';

type HighlightCaseCardProps = {
  item: HighlightCase;
  /** README 등 좁은 영역에서 기본 접힘 */
  defaultExpanded?: boolean;
  compact?: boolean;
};

export function HighlightCaseCard({
  item,
  defaultExpanded = false,
  compact = false,
}: HighlightCaseCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <article
      className={`highlight-case${expanded ? ' is-expanded' : ''}${compact ? ' is-compact' : ''}`}>
      <header className="highlight-case-header">
        <div className="highlight-case-title-row">
          <h3 className="highlight-case-title">{item.title}</h3>
          <span className="highlight-case-period">{item.period}</span>
        </div>
        <p className="highlight-case-subtitle">{item.subtitle}</p>
        <div className="highlight-case-tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {!expanded && item.outcomes[0] && (
          <p className="highlight-case-outcome-preview">{item.outcomes[0]}</p>
        )}
      </header>

      {expanded && (
        <div className="highlight-case-body">
          <section className="highlight-block">
            <h4>배경</h4>
            <ul>
              {item.context.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="highlight-block">
            <h4>판단 · 결정</h4>
            <ul>
              {item.decision.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="highlight-block">
            <h4>이슈 · 해결</h4>
            <div className="highlight-issues">
              {item.issues.map((issue, i) => (
                <div className="highlight-issue" key={i}>
                  <p>
                    <span className="issue-label">문제</span>
                    {issue.problem}
                  </p>
                  <p>
                    <span className="issue-label">대응</span>
                    {issue.action}
                  </p>
                  <p>
                    <span className="issue-label">결과</span>
                    {issue.result}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="highlight-block">
            <h4>성과 · 개선</h4>
            <ul>
              {item.outcomes.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <button
        type="button"
        className="highlight-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? '접기' : '더보기'}
      </button>
    </article>
  );
}
