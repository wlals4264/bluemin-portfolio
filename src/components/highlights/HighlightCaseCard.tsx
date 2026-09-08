'use client';

import '@/styles/components/Highlights.scss';
import '@/styles/components/HighlightDiagrams.scss';

import type { HighlightCase } from '@/mocks/highlightsData';

import { useState } from 'react';

import AdminDashboardPreview from './diagrams/AdminDashboardPreview';
import FunnelStatsPreview from './diagrams/FunnelStatsPreview';
import SprintDashboardPreview from './diagrams/SprintDashboardPreview';
import StepSyncCloseup from './diagrams/StepSyncCloseup';
import { BeforeAfterCompare, PendingQueueDiagram } from './diagrams/NavigationFlowDiagrams';
import WorkflowChips from './diagrams/WorkflowChips';
import LoopDiagram from './diagrams/LoopDiagram';

type HighlightCaseCardProps = {
  item: HighlightCase;
  /** 카드 목록에서 몇 번째인지 (표시용 번호) */
  index?: number;
  /** README 등 좁은 영역에서 기본 접힘 */
  defaultExpanded?: boolean;
  compact?: boolean;
};

/** item.id별로 실제 화면 구조를 본뜬 예시 시각화를 붙인다. 없으면 아무것도 렌더링하지 않는다. */
function HighlightVisual({ id }: { id: string }) {
  switch (id) {
    case 'webview-native-race':
      return (
        <>
          <BeforeAfterCompare
            columns={[
              { label: 'Before', steps: ['수면 측정 종료', '웹뷰 복귀 (pop)', '홈 화면'] },
              {
                label: 'After',
                steps: ['수면 측정 종료', '웹뷰 복귀 (pop)', '홈', 'router.replace', '리포트 화면'],
                highlightStep: 'router.replace',
                ok: true,
              },
            ]}
          />
          <PendingQueueDiagram />
        </>
      );
    case 'health-steps-sync':
      return <StepSyncCloseup />;
    case 'admin-funnel-ga':
      return (
        <>
          <AdminDashboardPreview />
          <FunnelStatsPreview />
        </>
      );
    case 'jira-sprint-dashboard':
      return <SprintDashboardPreview />;
    case 'ai-e2e-automation':
      return (
        <div className="hl-diagram-box">
          <WorkflowChips
            label="개발 워크플로우"
            steps={['PRD', 'Plan', '검토', 'Build', 'E2E 자체검증', 'MR']}
            highlightStep="E2E 자체검증"
          />
          <div style={{ marginTop: 14 }}>
            <LoopDiagram
              steps={['Test', 'Flaky 발생', 'AI 재검수', '지속 실패 시 원인 후보 파악 (AI)', '회귀 원인 수정']}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function HighlightCaseCard({
  item,
  index,
  defaultExpanded = false,
  compact = false,
}: HighlightCaseCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <article
      className={`highlight-case${expanded ? ' is-expanded' : ''}${compact ? ' is-compact' : ''}`}>
      <header className="highlight-case-header">
        <div className="highlight-case-title-row">
          <h3 className="highlight-case-title">
            {typeof index === 'number' && (
              <span className="highlight-case-index">{String(index + 1).padStart(2, '0')}</span>
            )}
            {item.title}
          </h3>
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

          <HighlightVisual id={item.id} />

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
