import { CareerFormData } from '../schema';

/**
 * URL에서 "https://" 이후, ".com" 직전의 문자열을 추출합니다.
 * @param url 추출할 대상 URL
 * @returns 추출된 문자열 또는 매칭되지 않으면 null
 */

export const extractDomainBeforeCom = (url: string): string => {
  const regex = /^https:\/\/(.*?)\.com/;
  const match = url.match(regex);

  // 정규식 매칭에 실패하면 'unknown' 반환
  if (!match) {
    return 'link';
  }

  // match[1]에 해당 정규식 그룹이 들어 있음
  return match[1];
};
export const extractDomainUsingRegex = (url: string) => {
  // https:// 또는 http:// 뒤에 오는 호스트(도메인) 부분만 추출
  // ^https?:\/\/([^/]+) -> 프로토콜 이후 슬래시 전까지
  const match = url.match(/^https?:\/\/([^/]+)/);
  return match ? match[1] : '';
};

// 2) 도메인(혹은 호스트 전체)을 보고 플랫폼을 분기 처리하기 위한 룩업 테이블
//    - pattern: 정규식
//    - platform: 매칭되면 반환할 플랫폼 이름
const PLATFORM_PATTERNS: { pattern: RegExp; platform: string }[] = [
  // velog.io
  { pattern: /velog\.io$/i, platform: 'velog' },
  // brunch.co.kr
  { pattern: /brunch\.co\.kr$/i, platform: 'brunch' },
  // tistory.com
  { pattern: /tistory\.com$/i, platform: 'tistory' },
  // behance.net
  { pattern: /behance\.net$/i, platform: 'behance' },
  // github.com
  { pattern: /github\.com$/i, platform: 'github' },
  // play.google.com
  { pattern: /play\.google\.com$/i, platform: 'playStore' },
  // apps.apple.com
  { pattern: /apps\.apple\.com$/i, platform: 'appStore' },
];

/**
 * 최종적으로 URL을 받아서 플랫폼을 판별하는 함수
 */
export function getPlatformFromUrl(url: string): string {
  // 1) 먼저 extractDomainUsingRegex로 호스트(도메인) 추출
  //    예) "https://velog.io/@jangwonyoon/테스트" -> "velog.io"
  //        "https://github.com/user" -> "github.com"
  //        "https://play.google.com/store" -> "play.google.com"
  //        "https://apps.apple.com/kr/app" -> "apps.apple.com"
  const extracted = extractDomainUsingRegex(url);

  if (!extracted) {
    return 'link';
  }

  const domain = extracted.toLowerCase();

  // 2) 룩업 테이블 순회하며 정규식으로 매칭되는지 검사
  for (const { pattern, platform } of PLATFORM_PATTERNS) {
    if (pattern.test(domain)) {
      return platform;
    }
  }

  // 3) 매칭되는 패턴이 없으면 unknown
  return extractDomainBeforeCom(url);
}

export const createCareerFormData = (data: CareerFormData): FormData => {
  const formData = new FormData();

  const {
    profileImage,
    nickname,
    detailJobId,
    interestDomain,
    summary,
    organization,
    region,
    hobby,
    news,
    sns,
    content,
    project,
  } = data;

  // 단순 필드 추가
  formData.append('profileImage', profileImage as File);
  formData.append('nickname', nickname);
  formData.append('detailJobId', detailJobId.toString());
  formData.append('interestDomain', JSON.stringify(interestDomain));
  formData.append('summary', summary);

  // 선택 필드
  if (organization) formData.append('organization', organization);
  if (region) formData.append('region', region);
  if (hobby) formData.append('hobby', hobby);
  if (news) formData.append('news', news);

  // 배열 필드: sns
  if (sns && sns.every((snsItem) => snsItem.link !== '')) {
    sns.forEach((snsItem, idx) => {
      formData.append(`sns[${idx}][type]`, snsItem.type);
      formData.append(`sns[${idx}][link]`, snsItem.link);
    });
  }

  // 배열 필드: content
  if (content && content.every((contentItem) => contentItem.link !== '')) {
    content.forEach((contentItem, idx) => {
      formData.append(`content[${idx}][type]`, contentItem.type);
      formData.append(`content[${idx}][link]`, contentItem.link);
      formData.append(`content[${idx}][title]`, contentItem.title);
      formData.append(`content[${idx}][imageUrl]`, contentItem.imageUrl);
      formData.append(`content[${idx}][description]`, contentItem.description);
    });
  }

  // 배열 필드: project
  if (project && project.every((projectItem) => projectItem.link !== '')) {
    project.forEach((projectItem, idx) => {
      formData.append(`project[${idx}][type]`, projectItem.type);
      formData.append(`project[${idx}][link]`, projectItem.link);
      formData.append(`project[${idx}][title]`, projectItem.title);
      formData.append(`project[${idx}][imageUrl]`, projectItem.imageUrl);
      formData.append(`project[${idx}][description]`, projectItem.description);
    });
  }

  return formData;
};
