// types.ts

import { Project } from 'next/dist/build/swc';

// 사용자 기본 정보 타입
export type UserDataDto = {
  name: string;
};

// 도메인 타입
export type DomainDto = {
  id: string;
  name: string;
};

// SNS 링크 타입
export type SNSLinkDto = {
  id: string;
  type: string;
  url: string;
};

// 최근 소식 타입
export type RecentNewsDto = {
  id: string;
  content: string;
};

// 취미 타입
export type HobbyDto = {
  id: string;
  content: string;
};

// 작성한 글 타입
export type PostDto = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  link: string;
};

// 프로젝트 타입
export type ProjectDto = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

// 사용자 상세 정보 타입
export type UserDataDetailDto = {
  jobTitle: string;
  organization: string;
  summary: string;
  region: string;
  domains: DomainDto[];
  snsLinks: SNSLinkDto[];
  recentNews: RecentNewsDto[];
  posts: PostDto[];
  projects: Project[];
};

// 쿼리 응답 타입
export type UserDataResponse = {
  userData: UserDataDto;
};

export type UserDataDetailResponse = {
  userDataDetail: UserDataDetailDto;
};
