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

export type FolderDto = {
  id: string;
  name: string;
};

// 명함 상세 정보 타입
export type CardDetailResponse = {
  nickname: string;
  job: string;
  detailJob: string;
  organization: string;
  summary: string;
  region: string;
  folders?: FolderDto[];
  memo?: string;
  interestDomain?: string[] | undefined;
  sns?: SnsDto[] | undefined;
  news?: string | undefined;
  hobby?: string | undefined;
  content?: ContentItemDto[] | undefined;
  project?: ProjectDto[] | undefined;
};

// 카드 상세 응답 타입
export type CardDetailDto = ApiResponse<CardDetailResponse>;
