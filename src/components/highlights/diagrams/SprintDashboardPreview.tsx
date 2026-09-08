const sprintStats = { done: 3, inProgress: 1, backlog: 4, progress: 62 };

const sprintTasks: { type: string; content: string; status: string; assignee: string }[] = [
  { type: '작업', content: '카카오 SDK 업데이트', status: '완료', assignee: '김지민' },
  { type: '작업', content: 'Flutter 오류 셀 동기화', status: '진행 중', assignee: '김지민' },
  { type: '작업', content: '오류 보고 유형 분류', status: '완료', assignee: '김지민' },
  { type: '버그', content: '모달·스낵바 오류 UX', status: '리뷰', assignee: '김지민' },
  { type: '작업', content: '전면 오류 네트워크 점검', status: '완료', assignee: '김지민' },
];

function SprintStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`hl-stat-card${highlight ? ' is-highlight' : ''}`}>
      <p className="hl-stat-label">{label}</p>
      <p className="hl-stat-value-row">
        <span className="hl-stat-value">{value}</span>
      </p>
    </div>
  );
}

/** Jira Sprint API 연동 대시보드를 본뜬 예시 시각화 (jira-sprint-dashboard 하이라이트용). */
export default function SprintDashboardPreview() {
  return (
    <div className="hl-diagram-box">
      <div className="hl-diagram-head">
        <p className="hl-diagram-title">9월 1주차 Sprint (실제 화면 기반)</p>
        <span className="hl-diagram-badge">예시 데이터</span>
      </div>

      <div className="hl-stat-grid hl-stat-grid-4">
        <SprintStat label="완료" value={String(sprintStats.done)} />
        <SprintStat label="진행 중" value={String(sprintStats.inProgress)} />
        <SprintStat label="백로그" value={String(sprintStats.backlog)} />
        <SprintStat label="전체 진행률" value={`${sprintStats.progress}%`} highlight />
      </div>

      <div className="hl-table hl-table-scroll">
        <table>
          <thead>
            <tr>
              <th>타입</th>
              <th>작업 내용</th>
              <th>진행 상태</th>
              <th>담당자</th>
            </tr>
          </thead>
          <tbody>
            {sprintTasks.map((t, i) => (
              <tr key={i}>
                <td>{t.type}</td>
                <td>{t.content}</td>
                <td>{t.status}</td>
                <td>{t.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
