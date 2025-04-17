/**
 * 날짜 문자열에서 현재 시간과의 차이를 계산하는 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns {number} 현재 시간과의 차이(시간 단위)
 */
export function getTimeDifference(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // 밀리초를 시간으로 변환
  return Math.floor(diffMs / (1000 * 60 * 60));
}

// 시간 형식을 "N시간 전"으로 변환하는 함수
export function formatTimeAgo(dateString: string): string {
  const hours = getTimeDifference(dateString);

  if (hours < 1) {
    return '방금 전';
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  }
}
