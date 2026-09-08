type WorkflowChipsProps = {
  label: string;
  steps: string[];
  highlightStep?: string;
  /** 화살표 없이 칩만 나열 */
  plain?: boolean;
};

/** 화살표로 이어지는 단계 칩 한 줄. 하이라이트 스텝은 강조 색으로 표시한다. */
export default function WorkflowChips({ label, steps, highlightStep, plain = false }: WorkflowChipsProps) {
  return (
    <div>
      <p className="hl-process-row-label">{label}</p>
      <div className="hl-chips-row">
        {steps.map((step, i) => (
          <span key={`${step}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className={`hl-chip${step === highlightStep ? ' is-highlighted' : ''}`}>{step}</span>
            {!plain && i < steps.length - 1 && <span className="hl-chip-arrow">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
