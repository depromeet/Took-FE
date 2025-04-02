import { CareerFormData } from '../schema';

export const CAREER_FORM = {
  firstStep: {
    title: '직군을 선택해 주세요',
    description: '직군에 맞는 템플릿으로 내 명함을 만들 수 있어요!',
  },
  thirdStep: {
    title: '나를 더 잘 보여줄 수 있는 ',
    subTitle: '정보를 추가해 보세요',
    description: '공통점을 찾아, 깊은 대화를 나누어보세요',
  },
};

// 백엔드 - 이미지 파일 제한크기 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// 스텝 상수
export const TOTAL_STEPS = 4;
export const MINIMUM_STEP = 1;
export const MAXIMUM_TAG_ADD = 10;

export const CARD_CREATE_INITIAL_VALUES: CareerFormData = {
  profileImage: '',
  nickname: '',
  detailJobId: 0,
  interestDomain: [],
  summary: '',
  organization: undefined,
  sns: [
    {
      type: 'blog',
      link: '',
    },
  ],
  region: undefined,
  hobby: undefined,
  news: undefined,
  content: [
    {
      type: 'blog',
      link: '',
      title: '',
      imageUrl: '',
      description: '',
    },
  ],
  project: [
    {
      type: 'project',
      link: '',
      title: '',
      imageUrl: '',
      description: '',
    },
  ],
  previewInfoType: 'PROJECT',
};
