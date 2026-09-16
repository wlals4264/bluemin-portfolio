import Image from 'next/image';

type Metric = { key: string; label: string; before: string; after: string; note: string };

const metrics: Metric[] = [
  {
    key: 'lcp',
    label: 'LCP (Lighthouse)',
    before: '7.87s · Poor',
    after: '1.74s · Good',
    note: '77.9% 단축 (약 4.5배)',
  },
  {
    key: 'icon',
    label: '아이콘 이미지 용량',
    before: '628KB (PNG)',
    after: '29KB (WebP)',
    note: '95%+ 절감',
  },
];

/** 홈 로딩 성능 개선의 Lighthouse LCP 패널과 핵심 지표를 나란히 보여준다 (home-loading-perf 하이라이트용). */
export default function LoadingPerfCompare() {
  return (
    <div className="hl-diagram-box">
      <div className="hl-diagram-head">
        <p className="hl-diagram-title">Lighthouse LCP — Before/After</p>
        <span className="hl-diagram-badge">실측 데이터</span>
      </div>

      <div className="hl-flow-grid">
        <div>
          <p className="hl-flow-col-label">Before</p>
          <div className="hl-perf-shot">
            <Image
              src="/images/portfolio/home-loading/before.png"
              alt="Lighthouse Local metrics: LCP 7.87s (Poor)"
              width={640}
              height={385}
              sizes="(max-width: 480px) 100vw, 260px"
            />
          </div>
        </div>
        <div>
          <p className="hl-flow-col-label is-ok">After</p>
          <div className="hl-perf-shot">
            <Image
              src="/images/portfolio/home-loading/after.png"
              alt="Lighthouse Local metrics: LCP 1.74s (Good)"
              width={640}
              height={355}
              sizes="(max-width: 480px) 100vw, 260px"
            />
          </div>
        </div>
      </div>

      {metrics.map((m) => (
        <div key={m.key}>
          <p className="hl-diagram-subtitle">{m.label}</p>
          <div className="hl-compare-grid">
            <div className="hl-compare-card">
              <p className="hl-compare-label">Before</p>
              <p className="hl-compare-value">{m.before}</p>
            </div>
            <div className="hl-compare-card is-after">
              <p className="hl-compare-label">After</p>
              <p className="hl-compare-value">{m.after}</p>
              <p className="hl-compare-note">{m.note}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
