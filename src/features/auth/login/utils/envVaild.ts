export function required(key: string, value: string | undefined) {
  if (value === undefined || value === '') {
    throw new Error(`환경변수: ${key} 설정되지 않았습니다.`);
  }
  return value;
}

export function optional(value: string | undefined, defaultValue: string = '') {
  if (value === undefined) {
    throw new Error('scope가 설정되지 않았습니다');
  }
  return value || defaultValue;
}
