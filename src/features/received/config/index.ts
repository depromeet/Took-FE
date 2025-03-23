import { PreviewInfoType } from '@/features/home/types';

export const RECEIVED_CARD_MOCK = [
  {
    id: 1,
    nickname: '홍길동',
    organization: 'ABC 회사',
    job: 'DEVELOPER',
    detailJob: '백엔드 개발자',
    summary: '백엔드 개발을 좋아하는 개발자입니다',
    interestDomain: ['웹', '모바일', '클라우드'],
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
