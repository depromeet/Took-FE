export const tagConfig = {
  '대표 프로젝트': { hasImg: true, hasTitle: true },
  '작성한 글': { hasImg: true, hasTitle: true },
  SNS: { hasImg: true, hasTitle: true },
  '최근 소식': { hasImg: false, hasTitle: false },
  '활동 지역': { hasImg: false, hasTitle: false },
  취미: { hasImg: false, hasTitle: false },
  '소속 정보': { hasImg: false, hasTitle: false },
} as const;

export type ThumbnailTag = keyof typeof tagConfig;
