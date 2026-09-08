const funnelStages = [
  { no: '1', label: 'Acquisition', sub: '앱 설치 수', value: 2140, display: '2,140' },
  { no: '2', label: 'Activation', sub: '가입자 수', value: 1284, display: '1,284' },
  { no: '3', label: 'Retention', sub: 'DAU 누적값 / 기간', value: 186, display: '186.4' },
  { no: '4', label: 'Referral', sub: '-', value: 0, display: '-' },
  { no: '5', label: 'Revenue', sub: '-', value: 0, display: '-' },
];

const measuredStages = funnelStages.filter((s) => s.value > 0);

function FunnelAreaChart() {
  const width = 560;
  const height = 66;
  const padX = 60;
  const padY = 8;
  const max = measuredStages[0].value;
  const stepX = (width - padX * 2) / (measuredStages.length - 1);
  const baseY = height - 18;

  const points = measuredStages.map((s, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - s.value / max) * (baseY - padY);
    return { x, y, ...s };
  });

  const areaPath =
    `M${points[0].x},${baseY} ` +
    points.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${baseY} Z`;
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="hl-svg-diagram"
      style={{ color: 'var(--accent)' }}
      role="img"
      aria-label="퍼널 전환 추이">
      <path d={areaPath} fill="currentColor" fillOpacity={0.14} />
      <polyline points={linePoints} fill="none" stroke="currentColor" strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="currentColor" />
      ))}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={height - 4}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-muted)">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

/** AARRR 퍼널 전환 추이를 본뜬 예시 시각화 (admin-funnel-ga 하이라이트용). */
export default function FunnelStatsPreview() {
  return (
    <div className="hl-diagram-box">
      <div className="hl-diagram-head">
        <p className="hl-diagram-title">퍼널 전환 통계 (실제 화면 기반)</p>
        <span className="hl-diagram-badge">예시 데이터</span>
      </div>

      <div className="hl-funnel-grid">
        {funnelStages.map((s) => (
          <div className="hl-funnel-stage" key={s.no}>
            <p className="hl-funnel-stage-label">
              {s.no}. {s.label}
            </p>
            <p className="hl-funnel-stage-sub">{s.sub}</p>
            <p className="hl-funnel-stage-value">{s.display}</p>
          </div>
        ))}
      </div>

      <FunnelAreaChart />
    </div>
  );
}
