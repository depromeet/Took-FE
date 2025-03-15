const tagStyle = 'absolute z-50 bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';

export type SelectedTagType = '대표 프로젝트' | '작성한 글' | 'SNS' | '취미' | '최근 소식' | '활동 지역' | '소속 정보';

export type TagConfigItem = {
  id: number;
  message: SelectedTagType;
  className: string;
  position: string;
  title?: string;
  description?: string;
  animation: string;
};

export const tagConfig: TagConfigItem[] = [
  {
    id: 1,
    message: '대표 프로젝트',
    className: tagStyle,
    position: 'bottom-28 right-0',
    title: '프로젝트 제목',
    description: '김디퍼님의 프로젝트 링크',
    animation: 'downandup',
  },
  {
    id: 2,
    message: '작성한 글',
    className: tagStyle,
    position: 'bottom-16 left-12',
    title: '작성한 글 제목',
    description: '김디퍼님의 게시물 링크',
    animation: 'downandup',
  },
  {
    id: 3,
    message: 'SNS',
    className: tagStyle,
    position: `right-0 top-16`,
    title: 'SNS 아이디',
    animation: 'upanddown',
  },
  {
    id: 4,
    message: '취미',
    className: tagStyle,
    position: 'bottom-8 right-20',
    description: `고소한 커피 한 잔과 함께 노트북을 켜고 새\n로운 아이디어를 정리하는 걸 좋아해요`,
    animation: 'upanddown',
  },
  {
    id: 5,
    message: '최근 소식',
    className: tagStyle,
    position: 'bottom-40 left-0',
    description: `부동산 스타트업에서 2년간 일하다가 \n 퇴사하고 지금은 이직 준비 중이에요`,
    animation: 'upanddown',
  },
  {
    id: 6,
    message: '활동 지역',
    className: tagStyle,
    position: `top-20 left-0`,
    description: `주로 서울 전역에서 활동하지만, \n특히 강남에서 자주 출몰해요`,
    animation: 'upanddown',
  },
  {
    id: 7,
    message: '소속 정보',
    className: tagStyle,
    position: 'left-40 top-0',
    animation: 'downandup',
  },
];
