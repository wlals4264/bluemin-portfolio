import '@/styles/components/Highlights.scss';
import '@/styles/components/HighlightDiagrams.scss';

import type { HighlightCase } from '@/mocks/highlightsData';

import AdminDashboardPreview from './diagrams/AdminDashboardPreview';
import FunnelStatsPreview from './diagrams/FunnelStatsPreview';
import SprintDashboardPreview from './diagrams/SprintDashboardPreview';
import StepSyncCloseup from './diagrams/StepSyncCloseup';
import { BeforeAfterCompare, PendingQueueDiagram } from './diagrams/NavigationFlowDiagrams';
import ProcessRows from './diagrams/ProcessRows';

type HighlightCaseCardProps = {
  item: HighlightCase;
  /** 카드 목록에서 몇 번째인지 (표시용 번호) */
  index: number;
};

function CaseField({ label, text }: { label: string; text: string }) {
  return (
    <div className="highlight-case-field">
      <p className="highlight-case-field-label">{label}</p>
      <p className="highlight-case-field-text">
        <span className="highlight-case-field-dot" />
        <span>{text}</span>
      </p>
    </div>
  );
}

/** item.id별로 실제 화면 구조를 본뜬 예시 시각화를 붙인다. 없으면 아무것도 렌더링하지 않는다. */
function HighlightVisual({ id }: { id: string }) {
  switch (id) {
    case 'navigation':
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
    case 'healthkit':
      return <StepSyncCloseup />;
    case 'ga4':
      return (
        <>
          <AdminDashboardPreview />
          <FunnelStatsPreview />
        </>
      );
    case 'admin-reporting-dashboard':
      return <SprintDashboardPreview />;
    default:
      return null;
  }
}

export function HighlightCaseCard({ item, index }: HighlightCaseCardProps) {
  return (
    <article className="highlight-case">
      <header className="highlight-case-header">
        <div className="highlight-case-title-row">
          <span className="highlight-case-index">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="highlight-case-title">{item.title}</h3>
        </div>

        <CaseField label="문제" text={item.problem} />
        <CaseField label="해결" text={item.solution} />
        <CaseField label="결과" text={item.result} />

        {item.process && <ProcessRows rows={item.process.rows} />}

        <HighlightVisual id={item.id} />
      </header>
    </article>
  );
}
