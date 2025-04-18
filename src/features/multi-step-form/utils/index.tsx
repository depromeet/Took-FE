import { UseFormSetValue, UseFormUnregister } from 'react-hook-form';

import { CareerFormData } from '../schema';
import { getStepValidationFields } from '../ui/careerForm/constants';

interface PlatformPattern {
  pattern: RegExp;
  platform: string;
}

/**
 * URL에서 도메인 부분만 추출합니다.
 * 플랫폼 판별용으로만 사용됩니다.
 */
export const extractDomainUsingRegex = (url: string): string => {
  // URL에 프로토콜이 없으면 추가
  const urlWithProtocol = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  // 프로토콜 이후 '/' 전까지의 전체 호스트 추출 (선택적으로 "www." 제거)
  const match = urlWithProtocol.match(/^https?:\/\/(?:www\.)?([^/]+)/);
  return match ? match[1].toLowerCase() : '';
};

/**
 * URL 정규화 - 프로토콜이 없는 URL에 https://를 추가합니다.
 * 원본 URL을 최대한 보존하면서 필요한 경우에만 프로토콜을 추가합니다.
 * 이미 정규화된 URL은 다시 처리하지 않습니다.
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return '';

  // 이미 정규화된 URL은 그대로 반환
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // 프로토콜만 추가하고 나머지는 그대로 유지
  return `https://${url}`;
};

// 플랫폼 패턴 룩업 테이블
const PLATFORM_PATTERNS: PlatformPattern[] = [
  // 블로그, 프로젝트
  { pattern: /velog\.io$/i, platform: 'velog' },
  { pattern: /brunch\.co\.kr$/i, platform: 'brunch' },
  { pattern: /tistory\.com$/i, platform: 'tistory' },
  { pattern: /behance\.net$/i, platform: 'behance' },
  { pattern: /github\.com$/i, platform: 'github' },
  { pattern: /play\.google\.com$/i, platform: 'playStore' },
  { pattern: /apps\.apple\.com$/i, platform: 'appStore' },
  { pattern: /blog\.naver\.com$/i, platform: 'naver' },

  // sns
  { pattern: /youtube\.com$/i, platform: 'youtube' },
  { pattern: /instagram\.com$/i, platform: 'instagram' },
  { pattern: /facebook\.com$/i, platform: 'facebook' },
  { pattern: /twitter\.com$/i, platform: 'twitter' },
  { pattern: /linkedin\.com$/i, platform: 'linkedin' },
  { pattern: /medium\.com$/i, platform: 'medium' },

  // 추가 패턴
  { pattern: /vercel\.app$/i, platform: 'vercel' },
];

// 결과 캐시 맵 - 같은 URL의 결과를 여러 번 계산하지 않도록 함
const platformTypeCache = new Map<string, string>();

/**
 * URL을 받아 플랫폼을 판별합니다.
 * - 플랫폼 패턴에 해당하면 해당 플랫폼 문자열 반환
 * - 해당되지 않으면 "LINK" 반환
 * - 원본 URL은 수정하지 않고 도메인 부분만 추출하여 판별에 사용합니다.
 * - 캐싱을 통해 동일한 URL에 대해 여러 번 계산하지 않습니다.
 */
export function getPlatformFromUrl(url: string): string {
  if (!url) return 'LINK';

  // 캐시에 있는지 확인하고 있으면 캐시된 결과 반환
  if (platformTypeCache.has(url)) {
    return platformTypeCache.get(url) || 'LINK';
  }

  try {
    // 플랫폼 판별을 위해 도메인만 추출
    const domain = extractDomainUsingRegex(url).toLowerCase();

    if (!domain) return 'LINK';

    // URL 전체(경로 포함)를 먼저 검사
    for (const { pattern, platform } of PLATFORM_PATTERNS) {
      if (pattern.test(url.toLowerCase())) {
        platformTypeCache.set(url, platform.toUpperCase());
        return platform.toUpperCase();
      }
    }

    // 도메인만 검사
    for (const { pattern, platform } of PLATFORM_PATTERNS) {
      if (pattern.test(domain)) {
        platformTypeCache.set(url, platform.toUpperCase());
        return platform.toUpperCase();
      }
    }

    // 해당하는 패턴이 없으면 'LINK' 반환하고 캐시에 저장
    platformTypeCache.set(url, 'LINK');
    return 'LINK';
  } catch (error) {
    console.error('Error determining platform from URL:', error);
    return 'LINK';
  }
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
    isImageRemoved,
  } = data;

  const { name } = profileImage as File;

  // 단순 필드 추가
  if (name !== 'default-avatar.png') formData.append('profileImage', profileImage as File);
  formData.append('nickname', nickname);
  formData.append('detailJobId', detailJobId.toString());
  formData.append('interestDomain', JSON.stringify(interestDomain));
  formData.append('summary', summary);

  // 선택 필드
  if (organization) formData.append('organization', organization);
  if (region) formData.append('region', region);
  if (hobby) formData.append('hobby', hobby);
  if (news) formData.append('news', news);
  if (isImageRemoved !== undefined) formData.append('isImageRemoved', isImageRemoved.toString());

  // URL 정규화 함수로 모든 링크 URL을 처리
  // 배열 필드: sns
  if (sns && sns.every((snsItem) => snsItem.link !== '' && sns.length > 0)) {
    formData.append('sns', JSON.stringify(sns)); // JSON.stringify로 배열 전체를 문자열로 변환
  }

  // 배열 필드: content
  if (content && content.every((contentItem) => contentItem.link !== '' && content.length > 0)) {
    formData.append('content', JSON.stringify(content));
  }

  // 배열 필드: project
  if (project && project.length > 0) {
    formData.append('project', JSON.stringify(project));
  }

  // previewInfoType
  formData.append('previewInfoType', data.previewInfoType ?? '');

  return formData;
};

export const resetStepFields = (
  step: number,
  setValue: UseFormSetValue<CareerFormData>,
  unregister: UseFormUnregister<CareerFormData>,
  resetTagCount: () => void,
  tagArray: string[],
) => {
  const resetArrayField = (tag: string) => {
    switch (tag) {
      case 'sns':
        setValue('sns', [{ type: '', link: '' }]);
        break;
      case 'content':
        setValue('content', [{ type: 'blog', link: '', title: '', imageUrl: '', description: '' }]);
        break;
      case 'project':
        setValue('project', [{ type: 'project', link: '', title: '', imageUrl: '', description: '' }]);
        break;
      default:
        break;
    }
  };

  const arrayFields = ['sns', 'project', 'content'];

  switch (step) {
    case 1:
      getStepValidationFields()[step].forEach((field) => {
        unregister(field);
      });
      break;

    case 2:
      resetTagCount();
      break;

    case 3:
      tagArray.forEach((tag) => {
        if (arrayFields.includes(tag)) {
          resetArrayField(tag);
        } else {
          unregister(tag as keyof CareerFormData);
        }
      });
      break;

    default:
      break;
  }
};
