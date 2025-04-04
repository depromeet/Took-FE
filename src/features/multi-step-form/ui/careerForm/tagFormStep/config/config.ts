const tagStyle = 'absolute z-tag bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';

export type SelectedTagType = '대표 프로젝트' | '작성한 글' | 'SNS' | '취미' | '최근 소식' | '활동 지역' | '소속 정보';
export type TagValue = 'project' | 'content' | 'sns' | 'hobby' | 'news' | 'region' | 'organization';

export type TagConfigItem = {
  id: number;
  message: SelectedTagType;
  value: TagValue;
  className: string;
  position: string;
  fixedPosition: string;
  title?: string;
  description?: string;
  animation: string;
  // 부모 컨테이너 중앙 기준으로 x, y 오프셋
  initialPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
};

export const tagConfig: TagConfigItem[] = [
  {
    id: 1,
    message: '대표 프로젝트',
    className: tagStyle,
    value: 'project',
    position: 'bottom-28 right-0',
    fixedPosition: 'right-[calc(50%-96px)] bottom-[calc(50%+7px)]',
    initialPosition: { x: 120, y: -200 },
    endPosition: { x: 0, y: 0 },
    title: '프로젝트 제목',
    description: '김디퍼님의 프로젝트 링크',
    animation: 'downandup',
  },
  {
    id: 2,
    message: '작성한 글',
    className: tagStyle,
    value: 'content',
    position: 'bottom-16 left-12',
    fixedPosition: 'left-[calc(50%-96px)] bottom-[calc(50%+7px)]',
    initialPosition: { x: -250, y: 0 },
    endPosition: { x: 0, y: 0 },
    title: '작성한 글 제목',
    description: '김디퍼님의 게시물 링크',
    animation: 'downandup',
  },
  {
    id: 3,
    message: 'SNS',
    value: 'sns',
    className: tagStyle,
    position: 'right-0 top-16',
    fixedPosition: 'right-[calc(50%)] top-[calc(50%-4px)]',
    initialPosition: { x: 200, y: -30 },
    endPosition: { x: 0, y: 0 },
    title: 'SNS 아이디',
    animation: 'upanddown',
  },
  {
    id: 4,
    message: '취미',
    value: 'hobby',
    className: tagStyle,
    position: 'bottom-8 right-20',
    fixedPosition: 'right-[calc(50%-60px)] bottom-[calc(50%-36px)]',
    initialPosition: { x: 100, y: 180 },
    endPosition: { x: 0, y: 0 },
    description: `고소한 커피 한 잔과 함께 노트북을 켜고 새\n로운 아이디어를 정리하는 걸 좋아해요`,
    animation: 'upanddown',
  },
  {
    id: 5,
    message: '최근 소식',
    value: 'news',
    className: tagStyle,
    position: 'bottom-40 left-0',
    fixedPosition: 'left-[calc(50%+4px)] bottom-[calc(50%+51px)]',
    initialPosition: { x: -200, y: 220 },
    endPosition: { x: 0, y: 0 },
    description: `부동산 스타트업에서 2년간 일하다가 \n 퇴사하고 지금은 이직 준비 중이에요`,
    animation: 'upanddown',
  },
  {
    id: 6,
    message: '활동 지역',
    value: 'region',
    className: tagStyle,
    position: 'top-20 left-0',
    fixedPosition: 'left-[calc(50%-88px)] top-[calc(50%-92px)]',
    initialPosition: { x: -240, y: -200 },
    endPosition: { x: 0, y: 0 },
    description: `주로 서울 전역에서 활동하지만, \n특히 강남에서 자주 출몰해요`,
    animation: 'upanddown',
  },
  {
    id: 7,
    message: '소속 정보',
    value: 'organization',
    className: tagStyle,
    position: 'left-40 top-0',
    fixedPosition: 'left-[calc(50%-40px)] top-[calc(50%-136px)]',
    initialPosition: { x: -30, y: -280 },
    endPosition: { x: 0, y: 0 },
    animation: 'downandup',
  },
];
