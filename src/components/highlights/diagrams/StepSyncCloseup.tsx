import Image from 'next/image';

type Bucket = { time: string; steps: number; partial?: boolean };

const buckets: Bucket[] = [
  { time: '06:00–06:15', steps: 480 },
  { time: '07:30–07:45', steps: 512 },
  { time: '09:00–09:15', steps: 605 },
  { time: '09:15–09:30', steps: 588 },
  { time: '12:00–12:15', steps: 460 },
  { time: '12:15–12:30', steps: 398 },
  { time: '15:00–15:15', steps: 610 },
  { time: '15:15–15:30', steps: 548 },
  { time: '15:30–15:38 (8분, 격자 밖 partial)', steps: 236, partial: true },
];

const fullBucketSum = buckets.filter((b) => !b.partial).reduce((sum, b) => sum + b.steps, 0);
const totalSum = buckets.reduce((sum, b) => sum + b.steps, 0);
const uiValue = 4437;

/** 걸음수 화면과 버킷 로그 정합성을 나란히 보여주는 클로즈업 (health-steps-sync 하이라이트용). */
export default function StepSyncCloseup() {
  return (
    <div className="hl-diagram-box">
      <div className="hl-stepsync">
        <div>
          <p className="hl-stepsync-col-title">실제 UI (걸음수 강조)</p>
          <div className="hl-stepsync-image">
            <Image
              src="/images/portfolio/steps-full.png"
              alt="걸음수 4,437 / 6,000, 74% (전체 화면)"
              fill
              sizes="130px"
            />
            <div
              className="hl-stepsync-highlight-box"
              style={{ left: '3.25%', top: '45.5%', width: '93.5%', height: '18.25%' }}
            />
            <span className="hl-stepsync-highlight-label" style={{ left: '3.25%', top: 'calc(45.5% - 18px)' }}>
              걸음수 섹션
            </span>
          </div>
        </div>

        <div>
          <p className="hl-stepsync-col-title">버킷 로그 정합성 (예시 데이터)</p>
          <div className="hl-table hl-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>버킷 (15분 단위)</th>
                  <th style={{ textAlign: 'right' }}>걸음수</th>
                </tr>
              </thead>
              <tbody>
                {buckets.map((b) => (
                  <tr key={b.time} style={b.partial ? { color: 'var(--accent)', fontWeight: 700 } : undefined}>
                    <td style={b.partial ? { color: 'var(--accent)', fontWeight: 700 } : undefined}>
                      {b.time}
                    </td>
                    <td
                      style={{
                        textAlign: 'right',
                        ...(b.partial ? { color: 'var(--accent)', fontWeight: 700 } : {}),
                      }}>
                      {b.steps.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hl-compare-grid">
            <div className="hl-compare-card">
              <p className="hl-compare-label">Before (partial 누락)</p>
              <p className="hl-compare-value">{fullBucketSum.toLocaleString()}</p>
              <p className="hl-compare-note">
                UI {uiValue.toLocaleString()}와 불일치 (diff {(uiValue - fullBucketSum).toLocaleString()})
              </p>
            </div>
            <div className="hl-compare-card is-after">
              <p className="hl-compare-label">After (partial 포함)</p>
              <p className="hl-compare-value">{totalSum.toLocaleString()}</p>
              <p className="hl-compare-note">UI {uiValue.toLocaleString()}와 일치 ✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
