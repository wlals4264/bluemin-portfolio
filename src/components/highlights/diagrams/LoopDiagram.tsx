/**
 * 5개 스텝을 상단 3개(왼→오) · 하단 2개(오→왼)로 배치하고,
 * 마지막 스텝에서 첫 스텝으로 되돌아가는 화살표로 순환 구조를 표현한다.
 */
export default function LoopDiagram({ steps }: { steps: string[] }) {
  const boxW = 138;
  const boxH = 34;
  const hGap = 24;
  const vGap = 28;
  const col = [0, boxW + hGap, 2 * (boxW + hGap)];
  const row = [0, boxH + vGap];
  const width = col[2] + boxW;
  const height = row[1] + boxH;

  const nodes = [
    { x: col[0], y: row[0], label: steps[0] },
    { x: col[1], y: row[0], label: steps[1] },
    { x: col[2], y: row[0], label: steps[2] },
    { x: col[2], y: row[1], label: steps[3] },
    { x: col[1], y: row[1], label: steps[4] },
  ];
  const cx = (n: { x: number }) => n.x + boxW / 2;
  const cy = (n: { y: number }) => n.y + boxH / 2;

  const connectors = [
    `M${nodes[0].x + boxW},${cy(nodes[0])} L${nodes[1].x},${cy(nodes[1])}`,
    `M${nodes[1].x + boxW},${cy(nodes[1])} L${nodes[2].x},${cy(nodes[2])}`,
    `M${cx(nodes[2])},${nodes[2].y + boxH} L${cx(nodes[3])},${nodes[3].y}`,
    `M${nodes[3].x},${cy(nodes[3])} L${nodes[4].x + boxW},${cy(nodes[4])}`,
    `M${nodes[4].x},${cy(nodes[4])} L${cx(nodes[0])},${cy(nodes[4])} L${cx(nodes[0])},${nodes[0].y + boxH}`,
  ];

  return (
    <div className="hl-diagram-box">
      <p className="hl-diagram-title">회귀 피드백 루프</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="hl-svg-diagram hl-loop-diagram"
        role="img"
        aria-label="회귀 피드백 루프 다이어그램">
        <defs>
          <marker
            id="loop-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-muted)" />
          </marker>
        </defs>

        {connectors.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="var(--border)"
            strokeWidth={1.5}
            fill="none"
            markerEnd="url(#loop-arrow)"
          />
        ))}

        {nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x}
              y={n.y}
              width={boxW}
              height={boxH}
              rx={8}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
            />
            <foreignObject x={n.x} y={n.y} width={boxW} height={boxH}>
              <div
                {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '9.5px',
                  fontWeight: 600,
                  color: 'var(--text-soft)',
                  padding: '0 6px',
                  lineHeight: 1.25,
                }}>
                {n.label}
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
}
