const dauSeries = [162, 178, 171, 190, 168, 175, 186];
const dauDates = ['08/26', '08/27', '08/28', '08/29', '08/30', '08/31', '09/01'];

function StatCard({
  label,
  value,
  trend,
  highlight,
}: {
  label: string;
  value: string;
  trend?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`hl-stat-card${highlight ? ' is-highlight' : ''}`}>
      <p className="hl-stat-label">{label}</p>
      <p className="hl-stat-value-row">
        <span className="hl-stat-value">{value}</span>
        {trend && <span className="hl-stat-trend">{trend}</span>}
      </p>
    </div>
  );
}

/** 실제 dauLineChartOption처럼 마지막 구간(전일→오늘)만 점선으로 표시한다. */
function DauLineChart() {
  const width = 560;
  const height = 76;
  const padX = 24;
  const padY = 16;
  const max = Math.max(...dauSeries);
  const min = Math.min(...dauSeries);
  const stepX = (width - padX * 2) / (dauSeries.length - 1);

  const points = dauSeries.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - (v - min) / (max - min || 1)) * (height - padY * 2);
    return { x, y };
  });

  const solidPoints = points.slice(0, -1);
  const dottedSegment = points.slice(-2);
  const toPath = (pts: typeof points) => pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="hl-svg-diagram"
      style={{ color: 'var(--accent)' }}
      role="img"
      aria-label="주간 DAU 추이">
      <polyline points={toPath(solidPoints)} fill="none" stroke="currentColor" strokeWidth={2} />
      <polyline
        points={toPath(dottedSegment)}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="currentColor" />
      ))}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={height - 2}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-muted)">
          {dauDates[i]}
        </text>
      ))}
    </svg>
  );
}

/** Admin 어드민 대시보드 구조를 본뜬 예시 시각화 (admin-funnel-ga 하이라이트용). */
export default function AdminDashboardPreview() {
  return (
    <div className="hl-diagram-box">
      <div className="hl-diagram-head">
        <p className="hl-diagram-title">Admin 대시보드 (실제 화면 기반)</p>
        <span className="hl-diagram-badge">예시 데이터</span>
      </div>

      <div className="hl-stat-grid hl-stat-grid-3">
        <StatCard label="총 가입자 수" value="1,284" />
        <StatCard label="DAU" value="186" trend="+9.5%" highlight />
        <StatCard label="오류 보고 현황" value="3" trend="0건 신규" />
      </div>

      <p className="hl-diagram-subtitle">지난 7일간 DAU</p>
      <DauLineChart />
    </div>
  );
}
