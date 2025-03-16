import { CareerFormData } from '../schema';
import { TagValue } from '../ui/careerForm/tagFormStep/config/config';

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

// 백엔드 - 논의 : 이미지 파일 제한크기
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 스텝 상수
export const TOTAL_STEPS = 4;
export const MINIMUM_STEP = 1;
export const MAXIMUM_ADD = 10;

// 테스트

// 디자인 직군 옵션
const designOptions = [
  { value: 'designer', label: 'Designer - 디자이너', keywords: ['디자이너'] },
  { value: 'product-designer', label: 'Product Designer - 프로덕트 디자이너', keywords: ['프로덕트 디자이너'] },
  { value: 'graphic-designer', label: 'Graphic Designer - 그래픽 디자이너', keywords: ['그래픽 디자이너'] },
  {
    value: 'interaction-designer',
    label: 'Interaction Designer - 인터랙션/인터렉션 디자이너',
    keywords: ['인터랙션 디자이너', '인터렉션 디자이너'],
  },
  {
    value: 'ux-ui-designer',
    label: 'UX/UI Designer - 유엑스유아이 디자이너, 유엑유아 디자이너',
    keywords: ['유엑스유아이 디자이너', '유엑유아 디자이너'],
  },
  {
    value: 'ux-designer',
    label: 'UX Designer - 유엑스 디자이너, 유엑 디자이너',
    keywords: ['유엑스 디자이너', '유엑 디자이너'],
  },
  { value: 'ui-designer', label: 'UI Designer - 유아이 디자이너', keywords: ['유아이 디자이너'] },
];

// 개발 직군 옵션
const developerOptions = [
  { value: 'developer', label: 'Developer - 디벨로퍼, 개발자', keywords: ['디벨로퍼', '개발자'] },
  { value: 'server-developer', label: 'Server Developer - 서버 ~', keywords: ['서버'] },
  { value: 'ai-developer', label: 'AI Developer - 에이아이~, 에아~', keywords: ['에이아이', '에아'] },
  { value: 'frontend-developer', label: 'Frontend Developer - 프론트~, 프론티드', keywords: ['프론트', '프론티드'] },
  {
    value: 'ios-developer',
    label: 'iOS Developer - 아오스, ios, 아이오에스',
    keywords: ['아오스', 'ios', '아이오에스'],
  },
  { value: 'android-developer', label: 'Android Developer', keywords: ['안드로이드'] },
  { value: 'fullstack-developer', label: 'Full-Stack Developer - 풀스택, 풀스텍', keywords: ['풀스택', '풀스텍'] },
  { value: 'devops-developer', label: 'DevOps Developer - 데브옵스', keywords: ['데브옵스'] },
  { value: 'desktop-developer', label: 'Desktop Developer - 데스크톱, 데스크탑', keywords: ['데스크톱', '데스크탑'] },
  { value: 'game-developer', label: 'Game Developer - 게임', keywords: ['게임'] },
  {
    value: 'data-engineering-developer',
    label: 'Data Engineering Developer - 데이타, 다타, 데이터, 엔지니어링',
    keywords: ['데이타', '다타', '데이터', '엔지니어링'],
  },
  { value: 'qa-developer', label: 'QA Developer - 큐에이, QA', keywords: ['큐에이', 'QA'] },
];

export const FIELD_TAG_MAPPING: Record<keyof Pick<CareerFormData, TagValue>, TagValue> = {
  organization: 'organization',
  sns: 'sns',
  region: 'region',
  hobby: 'hobby',
  news: 'news',
  content: 'content',
  project: 'project',
};

export const careerOptions = [...designOptions, ...developerOptions];
