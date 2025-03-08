const tagStyle = 'absolute z-50 bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';

export const tagConfig = [
  {
    id: 1,
    message: '소속 정보',
    className: tagStyle,
    // position: 'top-0 left-28',
    position: `left-1/2 -translate-x-1/2`,
  },
  {
    id: 2,
    message: '활동 지역',
    className: tagStyle,
    position: `top-20`,
  },
  {
    id: 3,
    message: 'SNS',
    className: tagStyle,
    // position: 'top-16 left-64',
    position: `right-0 top-16`,
  },
  {
    id: 4,
    message: '최근 소식',
    className: tagStyle,
    // position: 'top-64',
    position: 'bottom-40',
  },
  {
    id: 5,
    message: '작성한 글',
    className: tagStyle,
    position: 'bottom-16 left-12',
    // position: 'top-80 left-12',
  },
  {
    id: 6,
    message: '취미',
    className: tagStyle,
    position: 'bottom-8 right-20',
    // position: 'top-[23rem] left-44',
  },
  {
    id: 7,
    message: '대표 프로젝트',
    className: tagStyle,
    position: 'bottom-28 right-0',
    // position: 'top-72 left-52',
  },
];
