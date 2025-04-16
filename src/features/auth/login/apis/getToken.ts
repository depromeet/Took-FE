'use client';

import { setCookie } from 'cookies-next';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { webLogger } from '@/shared/lib/utils';
import { sendAuthTokenMessage } from '@/shared/utils/nativeBridge';
import { usePushTokenStore } from '@/store/pushTokenStore';

import { AuthDto, LoginPayloadDto, SocialProvider } from '../types/auth';

export async function getToken(provider: SocialProvider, code: string, expoToken?: string | null): Promise<AuthDto> {
  try {
    // expoToken이 있는 경우 요청 body에 포함
    const requestBody = expoToken ? { expoToken } : {};

    // 토큰 로깅
    if (expoToken) {
      webLogger.token('소셜 로그인 API 요청에 expoToken 포함됨', { expoToken });
    }

    const data = await client.post<LoginPayloadDto, AuthDto>(
      `${CLIENT_SIDE_URL}/api/auth/login/${provider}?code=${code}`,
      requestBody,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleSocialAuth(provider: SocialProvider, code: string) {
  try {
    // 스토어에서 직접 토큰 가져오기
    const expoToken = usePushTokenStore.getState().expoToken;

    // expoToken을 API 요청에 전달
    const tokenData: AuthDto = await getToken(provider, code, expoToken);

    setCookie('accessToken', tokenData.data.data.token.accessToken);
    setCookie('refreshToken', tokenData.data.data.token.refreshToken);
    setCookie('userData', JSON.stringify(tokenData.data.data.user));

    // 네이티브 앱으로 토큰 정보 전달 (웹뷰에서 실행 중일 경우)
    sendAuthTokenMessage(tokenData);

    return { success: true };
  } catch (error) {
    console.error(`${provider} 인증 처리 실패:`, error);
    return { success: false, error };
  }
}
