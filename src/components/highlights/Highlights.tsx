'use client';

import '@/styles/components/Highlights.scss';

import { highlightsData, type HighlightCase } from '@/mocks/highlightsData';

import { forwardRef, useState } from 'react';

import InfoHeader from '../header/InfoHeader';

function HighlightCaseCard({ item }: { item: HighlightCase }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`highlight-case${expanded ? ' is-expanded' : ''}`}>
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

const Highlights = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="highlights-container">
      <InfoHeader title="Highlights" className="highlights-header" />

      <div className="highlights-list">
        {highlightsData.map((item) => (
          <HighlightCaseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});

Highlights.displayName = 'Highlights';

export default Highlights;
