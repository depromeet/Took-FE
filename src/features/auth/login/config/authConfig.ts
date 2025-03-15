// config/authConfig.ts
import { SocialProvider } from '../types/auth';

/**
 * 인증 관련 기본 URL 설정
 */
const AUTH_BASE_URLS = {
  KAKAO: 'https://kauth.kakao.com/oauth/authorize',
  GOOGLE: 'https://accounts.google.com/o/oauth2/v2/auth',
  APPLE: 'https://appleid.apple.com/auth/authorize',
};

/**
 * 각 소셜 로그인 제공자별 환경 변수 설정
 */
export const providerEnvConfig = {
  KAKAO: {
    restApiKey: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '',
    redirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOCAL || '',
    scope: '',
  },
  GOOGLE: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    redirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_LOCAL || '',
    scope: 'email profile',
  },
  APPLE: {
    clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '',
    redirectUrl: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI_LOCAL || '',
    scope: 'email profile',
  },
};

/**
 * 현재 환경에 따른 리다이렉트 URL 반환
 */
export const getRedirectUrl = (provider: SocialProvider): string => {
  switch (provider) {
    case 'KAKAO':
      return providerEnvConfig.KAKAO.redirectUrl;
    case 'GOOGLE':
      return providerEnvConfig.GOOGLE.redirectUrl;
    case 'APPLE':
      return providerEnvConfig.APPLE.redirectUrl;
    default:
      return '';
  }
};

/**
 * 각 소셜 로그인 제공자의 인증 URL을 생성하는 함수들
 */
export const getAuthUrl = {
  KAKAO: () => {
    const { restApiKey } = providerEnvConfig.KAKAO;
    const redirectUrl = getRedirectUrl('KAKAO');
    const scope = providerEnvConfig.KAKAO.scope;

    return `${AUTH_BASE_URLS.KAKAO}?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`;
  },

  GOOGLE: () => {
    const { clientId } = providerEnvConfig.GOOGLE;
    const redirectUrl = getRedirectUrl('GOOGLE');
    const scope = providerEnvConfig.GOOGLE.scope;

    return `${AUTH_BASE_URLS.GOOGLE}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=${encodeURIComponent(scope)}`;
  },

  APPLE: () => {
    const { clientId } = providerEnvConfig.APPLE;
    const redirectUrl = getRedirectUrl('APPLE');
    const scope = providerEnvConfig.APPLE.scope;

    return `${AUTH_BASE_URLS.APPLE}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=${encodeURIComponent(scope)}`;
  },
};
