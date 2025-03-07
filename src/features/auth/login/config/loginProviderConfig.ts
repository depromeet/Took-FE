import { StaticImageData } from 'next/image';

import appleIcon from '@/shared/ui/icon/apple-icon.svg';
import googleIcon from '@/shared/ui/icon/google-icon.svg';
import kakaoIcon from '@/shared/ui/icon/kakao-icon.svg';

import { kakaoLogin } from '../model/providers/kakao';
import { SocialProvider } from '../types/auth';

export type ProviderConfig = {
  icon: StaticImageData;
  text: string;
  bgColor: string;
  textColor: string;
  loginFn: () => void;
};

export const loginProviderConfig: Record<SocialProvider, ProviderConfig> = {
  kakao: {
    icon: kakaoIcon,
    text: '카카오톡으로 시작하기',
    bgColor: 'bg-yellow-300',
    textColor: 'text-gray-800',
    loginFn: kakaoLogin,
  },
  google: {
    icon: googleIcon,
    text: '구글 계정으로 시작하기',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    // googleLogin으로 변경 예정
    loginFn: kakaoLogin,
  },
  apple: {
    icon: appleIcon,
    text: '애플로 시작하기',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    // appleLogin으로 변경 예정
    loginFn: kakaoLogin,
  },
};
