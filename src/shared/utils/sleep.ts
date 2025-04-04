// 비동기 작업을 위한 대기 함수
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
