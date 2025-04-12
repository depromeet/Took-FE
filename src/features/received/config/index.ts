import { PreviewInfoType } from '@/features/home/types';

const DOMAIN_BASE_URL = '/received';

export const ROUTE_PATH = {
  main: `${DOMAIN_BASE_URL}`,
  interesting: `${DOMAIN_BASE_URL}/interesting`,
};

export const RECEIVED_CARD_MOCK = [
  {
    id: 1,
    nickname: '홍길동',
    organization: 'ABC 회사',
    job: 'DESIGNER',
    detailJob: 'UI/UX 디자이너',
    summary: 'UX에 관심 많은 디자이너입니다.',
    interestDomain: ['웹', '모바일', 'UX'],
    previewInfoType: 'PROJECT' as PreviewInfoType,
    previewInfo: {
      project: {
        title: 'Took',
        link: 'https://github.com/username/project',
        imageUrl: 'https://avatars.githubusercontent.com/u/18240792?s=48&v=4',
        description: 'Spring Boot 기반 명함 관리 서비스',
      },
      content: {
        title: 'Spring Boot로 RESTful API 만들기',
        link: 'https://blog.example.com/posts/123',
        imageUrl: '/images/thumbnails/post123.jpg',
        description: 'Spring Boot를 이용한 RESTful API 개발 방법을 소개합니다.',
      },
      hobby: '등산, 독서',
      sns: {
        type: 'LINKEDIN',
        link: 'https://linkedin.com/in/username',
      },
      news: '최근 블로그 포스팅 시작했습니다',
      region: '서울 강남구',
    },
    imagePath: '/images/profile/user1.jpg',
  },
  {
    id: 2,
    nickname: '장영주',
    organization: '디프만',
    job: 'DEVELOPER',
    detailJob: '프론트엔드 개발자',
    summary: '안녕하세요프론트엔드공부하고있어요안녕하세요프론트엔드공부하고있어요',
    interestDomain: ['웹', '모바일', 'UI/UX'],
    previewInfoType: 'SNS' as PreviewInfoType,
    previewInfo: {
      project: {
        title: 'Took',
        link: 'https://github.com/username/project',
        imageUrl: 'https://avatars.githubusercontent.com/u/18240792?s=48&v=4',
        description: 'Spring Boot 기반 명함 관리 서비스',
      },
      content: {
        title: 'Spring Boot로 RESTful API 만들기',
        link: 'https://blog.example.com/posts/123',
        imageUrl: '/images/thumbnails/post123.jpg',
        description: 'Spring Boot를 이용한 RESTful API 개발 방법을 소개합니다.',
      },
      hobby: '등산, 독서',
      sns: {
        type: 'LINKEDIN',
        link: 'https://linkedin.com/in/username',
      },
      news: '최근 블로그 포스팅 시작했습니다',
      region: '서울 강남구',
    },
    imagePath: '/images/profile/user1.jpg',
  },
];

export const FOLDERS_MOCK = [
  {
    id: 0,
    name: '디프만',
  },
  {
    id: 1,
    name: 'YAPP',
  },
  {
    id: 2,
    name: '엘리스랩',
  },
  {
    id: 3,
    name: '카카오',
  },
];

export const SORTING = ['최근 공유 순', '오름차순', '내림차순'];

export const MAX_FOLDER_NAME_LENGTH = 10;
