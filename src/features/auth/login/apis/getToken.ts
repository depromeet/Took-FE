'use client';

import { setCookie } from 'cookies-next';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { webLogger } from '@/shared/lib/utils';
import { sendAuthTokenMessage } from '@/shared/utils/nativeBridge';
import { usePushTokenStore } from '@/store/pushTokenStore';

import { AuthDto, LoginPayloadDto, SocialProvider } from '../types/auth';

/**
 * expoToken이 문자열 또는 JSON 문자열 형태로 올 수 있으므로 이를 처리하는 함수
 */
function extractExpoToken(tokenValue: string | null): string | null {
  if (!tokenValue) return null;

  try {
    // JSON 형태인지 확인 시도
    if (tokenValue.startsWith('{') && tokenValue.includes('expoToken')) {
      const parsed = JSON.parse(tokenValue);
      return parsed.expoToken || null;
    }
    // 이미 토큰 문자열이면 그대로 반환
    return tokenValue;
  } catch (e) {
    // 파싱 실패 시 원본 값 반환
    console.warn('토큰 파싱 실패:', e);
    return tokenValue;
  }
}

export async function getToken(provider: SocialProvider, code: string, expoToken?: string | null): Promise<AuthDto> {
  try {
    // expoToken 파싱 및 처리
    const parsedToken = expoToken ? extractExpoToken(expoToken) : null;

    // expoToken이 있는 경우에만 requestBody를 생성, 없으면 undefined
    const requestBody = parsedToken ? { expoToken: parsedToken } : undefined;

    // 토큰 로깅
    if (parsedToken) {
      webLogger.token('소셜 로그인 API 요청에 expoToken 포함됨', { parsedToken });
      console.log('Login requestBody', requestBody);
    } else {
      console.log('expoToken이 없어 requestBody는 전송되지 않음');
    }

    // 토큰이 있을 때만 body 전달
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
