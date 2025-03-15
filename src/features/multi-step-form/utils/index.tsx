/**
 * URL에서 "https://" 이후, ".com" 직전의 문자열을 추출합니다.
 * @param url 추출할 대상 URL
 * @returns 추출된 문자열 또는 매칭되지 않으면 null
 */
const extractDomainUsingRegex = (url: string) => {
  const regex = /^https:\/\/(.*?)\.com/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

export { extractDomainUsingRegex };
