/**
 * "2025.08 ~ 재직중" 같은 진행 중인 경력 항목에 실제 근속 기간("1년 1개월")을
 * 오늘 날짜 기준으로 계산해 붙여준다. 종료일이 이미 확정된 과거 경력(예: "2021.04 ~ 2024.08
 * (3년 5개월)")은 이미 텍스트에 기간이 포함돼 있으므로 이 함수를 거치지 않는다.
 */
export function isOngoingCareer(date: string): boolean {
  return date.includes('재직중');
}

/** "YYYY.MM" 형식의 시작월을 오늘 날짜와 비교해 "N년 M개월" 형태로 반환한다. */
export function formatOngoingDuration(startLabel: string, now: Date = new Date()): string {
  const [year, month] = startLabel.trim().split('.').map(Number);
  if (!year || !month) return '';

  const startMonths = year * 12 + (month - 1);
  const nowMonths = now.getFullYear() * 12 + now.getMonth();
  const diff = Math.max(0, nowMonths - startMonths);

  const years = Math.floor(diff / 12);
  const months = diff % 12;

  if (years > 0 && months > 0) return `${years}년 ${months}개월`;
  if (years > 0) return `${years}년`;
  return `${months}개월`;
}

/**
 * career item의 date 문자열("2025.08 ~ 재직중")을 받아 "2025.08 ~ 재직중 (1년 1개월)"을 만든다.
 * 이미 종료된 경력의 기존 표기("2021.04 ~ 2024.08 (3년 5개월)")와 괄호 포맷을 맞춘 것이다.
 */
export function withOngoingDuration(date: string, now: Date = new Date()): string {
  if (!isOngoingCareer(date)) return date;

  const [startLabel] = date.split('~');
  const duration = formatOngoingDuration(startLabel, now);
  return duration ? `${date} (${duration})` : date;
}
