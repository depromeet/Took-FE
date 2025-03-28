import { UseFormSetValue, UseFormUnregister } from 'react-hook-form';

import { CareerFormData } from '../schema';
import { STEP_VALIDATION_FIELDS } from '../ui/careerForm/constants';

interface PlatformPattern {
  pattern: RegExp;
  platform: string;
}

export const extractDomainUsingRegex = (url: string): string => {
  // 프로토콜 이후 '/' 전까지의 전체 호스트 추출 (선택적으로 "www." 제거)
  const match = url.match(/^https?:\/\/(?:www\.)?([^/]+)/);
  return match ? match[1].toLowerCase() : '';
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
];

/**
 * URL을 받아 플랫폼을 판별합니다.
 * - 플랫폼 패턴에 해당하면 해당 플랫폼 문자열 반환
 * - 해당되지 않으면 "LINK" 반환
 */
export function getPlatformFromUrl(url: string): string {
  const domain = extractDomainUsingRegex(url).toLowerCase();

  for (const { pattern, platform } of PLATFORM_PATTERNS) {
    if (pattern.test(domain)) {
      return platform.toUpperCase();
    }
  }

  return 'LINK';
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
  if (sns && sns.every((snsItem) => snsItem.link !== '' && sns.length > 0)) {
    formData.append('sns', JSON.stringify(sns)); // JSON.stringify로 배열 전체를 문자열로 변환
  }

  // 배열 필드: content
  if (content && content.every((contentItem) => contentItem.link !== '' && content.length > 0)) {
    formData.append('content', JSON.stringify(content)); // JSON.stringify로 배열 전체를 문자열로 변환
  }

  // 배열 필드: project
  if (project && project.every((projectItem) => projectItem.link !== '' && project.length > 0)) {
    formData.append('project', JSON.stringify(project)); // JSON.stringify로 배열 전체를 문자열로 변환
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
      STEP_VALIDATION_FIELDS[step].forEach((field) => {
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
