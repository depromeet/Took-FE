// API 응답 기본 구조
export type ApiResponse<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
};

// SNS 타입
export type SnsDto = {
  type: string;
  link: string;
};

// 콘텐츠 아이템 (블로그 포스트 등) 타입
export type ContentItemDto = {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
};

// 프로젝트 타입
export type ProjectDto = {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
};

// 미리보기 정보 타입
export type PreviewInfoType = 'PROJECT' | 'CONTENT' | 'HOBBY' | 'SNS' | 'NEWS' | 'REGION';

// 미리보기 정보 구조
export type PreviewInfo = {
  project?: ProjectDto;
  content?: ContentItemDto;
  hobby?: string;
  sns?: SnsDto;
  news?: string;
  region?: string;
};

// 카드 기본 정보 타입
export type CardInfo = {
  id: number;
  nickname: string;
  organization: string;
  job: string;
  detailJob: string;
  summary: string;
  interestDomain?: string[];
  previewInfoType: PreviewInfoType;
  previewInfo: PreviewInfo;
  imagePath: string;
};

// 내 카드 응답 타입
export type MyCardResponse = {
  cards: CardInfo[];
};

// 내 카드 DTO 타입
export type MyCardDto = ApiResponse<MyCardResponse>;
