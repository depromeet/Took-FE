import { useQuery } from '@tanstack/react-query';

const userData = {
  name: '이재인',
};

const userDataDetail = {
  jobTitle: 'Frontend Developer',
  organization: '디프만',
  summary: '사용자 경험을 중요시하는 프론트엔드 개발자입니다.',
  region: '게더',
  domains: [
    { id: '1', name: '웹 개발' },
    { id: '2', name: 'UI/UX' },
    { id: '3', name: '프론트엔드' },
    { id: '4', name: 'React' },
  ],
  snsLinks: [
    { id: '1', type: 'GitHub', url: 'https://github.com/jaeiny' },
    { id: '2', type: 'LinkedIn', url: 'https://linkedin.com/in/jaeiny' },
    { id: '2', type: 'LinkedIn', url: 'https://linkedin.com/in/jaeiny' },
    { id: '2', type: 'LinkedIn', url: 'https://linkedin.com/in/jaeiny' },
    { id: '2', type: 'LinkedIn', url: 'https://linkedin.com/in/jaeiny' },
  ],
  recentNews: { id: '1', content: '새로운 프로젝트 공개' },
  hobby: { id: '1', content: '농구 , 코딩 ,커피 마시기' },
  posts: [
    {
      id: '1',
      thumbnail: '',
      title: 'React 컴포넌트 최적화 전략 React 컴포넌트 최적화 전략React 컴포넌트 최적화 전략',
      description: 'React 컴포넌트 최적화 전략',
      link: '/blog/react-optimization',
    },
    {
      id: '2',
      thumbnail: '',
      title: 'React 컴포넌트 최적화 전략',
      description: '',
      link: '/blog/react-optimization',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'UI 컴포넌트 라이브러리',
      description: 'React와 TypeScript로 만든 UI 컴포넌트 모음',
      thumbnail: '/images/projects/ui-library.png',
    },
    {
      id: '2',
      title: '개발자 네트워킹 플랫폼',
      description: '개발자들이 서로 연결되고 프로젝트를 공유하는 앱',
      thumbnail: '/images/projects/dev-network.png',
    },
  ],
};

const fetchUserData = async () => {
  return { userData };
};

const fetchUserDataDetail = async () => {
  return { userDataDetail };
};

export const useUser = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });
};

export const useUserDetail = () => {
  return useQuery({
    queryKey: ['userDataDetail'],
    queryFn: fetchUserDataDetail,
  });
};
