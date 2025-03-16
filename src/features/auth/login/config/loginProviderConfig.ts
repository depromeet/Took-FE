import { SocialProvider } from '../types/auth';

export type KakaoConfig = {
  restApiKey: string;
  redirectUrl: string;
};

export type ProviderConfig = {
  icon: string;
  text: string;
  bgColor: string;
  textColor: string;
};

export const loginProviderConfig: Record<SocialProvider, ProviderConfig> = {
  KAKAO: {
    icon: '/icons/kakao-icon.svg', // 경로 변경
    text: '카카오톡으로 시작하기',
    bgColor: 'bg-yellow-300',
    textColor: 'text-gray-800',
  },
  GOOGLE: {
    icon: '/icons/google-icon.svg', // 경로 변경
    text: '구글 계정으로 시작하기',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
  },
  APPLE: {
    icon: '/icons/apple-icon.svg', // 경로 변경
    text: '애플로 시작하기',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
  },
};
