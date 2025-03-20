import { SnsDto, ContentItemDto, ProjectDto, ApiResponse } from './cardDetail';

// 명함 상세 정보 타입
export type ReceivedCardDetailResponse = {
  nickname: string;
  job: string;
  detailJob: string;
  organization: string;
  summary: string;
  region: string;
  group: string[];
  introduce: string;
  interestDomain?: string[] | undefined;
  sns?: SnsDto[] | undefined;
  news?: string | undefined;
  hobby?: string | undefined;
  content?: ContentItemDto[] | undefined;
  project?: ProjectDto[] | undefined;
};

// 카드 상세 응답 타입
export type ReceivedCardDetailDto = ApiResponse<ReceivedCardDetailResponse>;
