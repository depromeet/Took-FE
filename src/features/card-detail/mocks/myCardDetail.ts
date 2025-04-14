// mocks/sample.ts
import { CardDetailDto } from '../types/cardDetail';

// API 응답 형식에 맞는 임시 데이터
export const mockCardDetailData: CardDetailDto = {
  status: 'CONTINUE',
  message: '성공적으로 조회되었습니다.',
  timestamp: '2025-03-10T08:03:28.800Z',
  data: {
    nickname: '이재인',
    job: 'DESIGNER',
    detailJob: 'Frontend Developer',
    organization: '디프만',
    summary: '사용자 경험을 중요시하는 프론트엔드 개발자입니다. ',
    region: '게더',
    folders: [
      {
        id: 1,
        name: '디프만',
      },
      {
        id: 2,
        name: '엘리스랩',
      },
    ],
    memo: '디프만 web 16기 윤장원입니다!',
    interestDomain: ['이커머스', '금융'],
    sns: [
      {
        type: 'INSTAGRAM',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'GITHUB',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'LINKEDIN',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'NAVER_BLOG',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'NAVER_BLOG',
        link: 'https://github.com/jaeiny',
      },
    ],
    news: 'news',
    hobby: 'hobby',
    content: [
      {
        title: '',
        link: 'https://hoya324.tistory.com/m/entry/%EA%B7%BC%EC%B2%98%EC%97%90-%EC%9E%88%EB%8A%94-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A1%B0%ED%9A%8C-%EA%B8%B0%EB%8A%A5-Redis-Geospatial%EA%B0%80-%EC%A0%81%ED%95%A9%ED%95%9C-%EC%84%A0%ED%83%9D%EC%9D%BC%EA%B9%8C',
        imageUrl: '',
        description: '',
      },
      {
        title: 'Spring Boot로 RESTful API 만들기',
        link: 'https://blog.example.com/posts/123',
        imageUrl: '/icons/imageIcon.svg',
        description: 'Spring Boot를 이용한 RESTful API 개발 방법을 소개합니다.',
      },
    ],
    project: [
      {
        title: 'UI 컴포넌트 라이브러리',
        link: 'https://github.com/username/project',
        imageUrl: '',
        description: 'React와 TypeScript로 만든 UI 컴포넌트 모음',
      },
      {
        title: '개발자 네트워킹 플랫폼',
        link: 'https://github.com/username/project',
        imageUrl: '',
        description: '개발자들이 서로 연결되고 프로젝트를 공유하는 앱',
      },
    ],
    imagePath:
      'https://even-took.s3.ap-northeast-2.amazonaws.com/develop/profile/4a78189e-1033-4a4c-89ba-24cad7021d0f_KakaoTalk_Photo_2024-10-29-11-13-30.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250414T013733Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIASE5KRLTQY4E7PPOW%2F20250414%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=6ea23ac822ee430d16ab284df7eb0b2cde3347534d0528bcf456f540b404fc55',
    isPrimary: true,
  },
};
