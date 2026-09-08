import type { ProcessRow } from '@/mocks/highlightsData';

import WorkflowChips from './WorkflowChips';
import LoopDiagram from './LoopDiagram';

/** highlightsData의 process.rows를 칩 체인 · 칩 나열 · 회귀 루프로 그린다. */
export default function ProcessRows({ rows }: { rows: ProcessRow[] }) {
  return (
    <div className="hl-process-rows">
      {rows.map((row) =>
        row.loopBack ? (
          <LoopDiagram key={row.label} label={row.label} steps={row.steps} />
        ) : (
          <WorkflowChips
            key={row.label}
            label={row.label}
            steps={row.steps}
            highlightStep={row.highlightStep}
            plain={row.plain}
          />
        ),
      )}
    </div>
  );
}
