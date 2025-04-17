/**
 * ISO 형식 날짜 문자열에서 현재 시간과의 차이를 계산하는 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 현재 시간과의 차이(분 단위)
 */
export function getTimeDifference(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // 밀리초를 분으로 변환
  return Math.floor(diffMs / (1000 * 60));
}

/**
 * 날짜 문자열을 시간 경과에 따른 표시 형식으로 변환하는 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 시간 경과에 따른 표시 형식의 문자열
 */
export function formatTimeAgo(dateString: string): string {
  const minutes = getTimeDifference(dateString);

  // 1분 미만: 방금 전
  if (minutes < 1) {
    return '방금 전';
  }

  // 1분 이상 60분 미만: N분 전
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);

  // 1시간 이상 24시간 미만: N시간 전
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);

  // 1일 이상 30일 미만: N일 전
  if (days < 30) {
    return `${days}일 전`;
  }

  const months = Math.floor(days / 30);

  // 1개월 이상 12개월 미만: N개월 전
  if (months < 12) {
    return `${months}개월 전`;
  }

  // 1년 이상: N년 전
  const years = Math.floor(months / 12);
  return `${years}년 전`;
}
