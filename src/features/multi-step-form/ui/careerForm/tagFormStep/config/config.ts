const tagStyle = 'absolute z-tag bg-opacity-white-20  text-white cursor-pointer';

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
  initialPosition: { x: number | string; y: number };
  endPosition: { x: number; y: number };

  firstEndPosition: { x: number; y: number };
  secondEndPosition: { x: number; y: number };
  thirdEndPosition: { x: number; y: number };
  fixedEndPosition: { x: number; y: number };
};

export const tagConfig: TagConfigItem[] = [
  {
    id: 1,
    message: '대표 프로젝트',
    className: tagStyle,
    value: 'project',
    position: 'bottom-28 right-0',
    fixedPosition: 'right-[calc(50%-96px)] bottom-[calc(50%+7px)]',
    initialPosition: { x: 40, y: 50 },
    endPosition: { x: -50, y: -60 },
    title: '프로젝트 제목',
    description: '김디퍼님의 프로젝트 링크',
    animation: 'downandup',

    firstEndPosition: { x: -50, y: -60 },
    secondEndPosition: { x: -50, y: -100 },
    thirdEndPosition: { x: -50, y: -20 },
    fixedEndPosition: { x: -10, y: -50 },
  },
  {
    id: 2,
    message: '작성한 글',
    className: tagStyle,
    value: 'content',
    position: 'bottom-16 left-12',
    fixedPosition: 'left-[calc(50%-96px)] bottom-[calc(50%+7px)]',
    initialPosition: { x: -100, y: 90 },
    endPosition: { x: -40, y: -60 },
    title: '작성한 글 제목',
    description: '김디퍼님의 게시물 링크',
    animation: 'downandup',

    firstEndPosition: { x: -40, y: -60 },
    secondEndPosition: { x: -40, y: -100 },
    thirdEndPosition: { x: -40, y: -20 },
    fixedEndPosition: { x: -95, y: -50 },
  },
  {
    id: 3,
    message: 'SNS',
    value: 'sns',
    className: tagStyle,
    position: 'right-0 top-16',
    fixedPosition: 'right-[calc(50%)] top-[calc(50%-4px)]',
    initialPosition: { x: 90, y: -170 },
    endPosition: { x: -30, y: -60 },
    title: 'SNS 아이디',
    animation: 'upanddown',

    firstEndPosition: { x: -30, y: -60 },
    secondEndPosition: { x: -30, y: -100 },
    thirdEndPosition: { x: -30, y: -20 },
    fixedEndPosition: { x: -60, y: -10 },
  },
  {
    id: 4,
    message: '취미',
    value: 'hobby',
    className: tagStyle,
    position: 'bottom-8 right-20',
    fixedPosition: 'right-[calc(50%-60px)] bottom-[calc(50%-36px)]',
    initialPosition: { x: 10, y: 130 },
    endPosition: { x: -25, y: -60 },
    description: `고소한 커피 한 잔과 함께 노트북을 켜고 새\n로운 아이디어를 정리하는 걸 좋아해요`,
    animation: 'upanddown',

    firstEndPosition: { x: -25, y: -60 },
    secondEndPosition: { x: -25, y: -100 },
    thirdEndPosition: { x: -25, y: -20 },
    fixedEndPosition: { x: 5, y: -10 },
  },
  {
    id: 5,
    message: '최근 소식',
    value: 'news',
    className: tagStyle,
    position: 'bottom-40 left-0',
    fixedPosition: 'left-[calc(50%+4px)] bottom-[calc(50%+51px)]',
    initialPosition: { x: -150, y: 20 },
    endPosition: { x: -40, y: -60 },
    description: `부동산 스타트업에서 2년간 일하다가 \n 퇴사하고 지금은 이직 준비 중이에요`,
    animation: 'upanddown',

    firstEndPosition: { x: -40, y: -60 },
    secondEndPosition: { x: -40, y: -100 },
    thirdEndPosition: { x: -40, y: -20 },
    fixedEndPosition: { x: 0, y: -90 },
  },
  {
    id: 6,
    message: '활동 지역',
    value: 'region',
    className: tagStyle,
    position: 'top-20 left-0',
    fixedPosition: 'left-[calc(50%-88px)] top-[calc(50%-92px)]',
    initialPosition: { x: -150, y: -150 },
    endPosition: { x: -40, y: -60 },
    description: `주로 서울 전역에서 활동하지만, \n특히 강남에서 자주 출몰해요`,
    animation: 'upanddown',

    firstEndPosition: { x: -40, y: -60 },
    secondEndPosition: { x: -40, y: -100 },
    thirdEndPosition: { x: -40, y: -20 },
    fixedEndPosition: { x: -85, y: -90 },
  },
  {
    id: 7,
    message: '소속 정보',
    value: 'organization',
    className: tagStyle,
    position: 'left-40 top-0',
    fixedPosition: 'left-[calc(50%-40px)] top-[calc(50%-136px)]',
    initialPosition: { x: -40, y: -210 },
    endPosition: { x: -40, y: -60 },
    animation: 'downandup',

    firstEndPosition: { x: -40, y: -60 },
    secondEndPosition: { x: -40, y: -100 },
    thirdEndPosition: { x: -40, y: -20 },
    fixedEndPosition: { x: -40, y: -130 },
  },
];
