export type TabId = 'domains' | 'sns' | 'news' | 'hobby' | 'posts' | 'projects';
export type TabItem = {
  id: TabId;
  label: string;
};

export const CARD_TABS: TabItem[] = [
  { id: 'domains', label: '관심 도메인' },
  { id: 'sns', label: 'SNS' },
  { id: 'news', label: '최근 소식' },
  { id: 'hobby', label: '취미' },
  { id: 'posts', label: '작성한 글' },
  { id: 'projects', label: '대표 프로젝트' },
];
