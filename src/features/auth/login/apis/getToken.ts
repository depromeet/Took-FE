'use client';

import { setCookie } from 'cookies-next';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { AuthDto } from '../types/auth';

export type SocialProvider = 'KAKAO' | 'GOOGLE' | 'APPLE';

export async function getToken(provider: SocialProvider, code: string): Promise<AuthDto> {
  try {
    const response = await client.post<null, AuthDto>(`${CLIENT_SIDE_URL}/api/auth/login/${provider}?code=${code}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleSocialAuth(provider: SocialProvider, code: string) {
  try {
    const tokenData: AuthDto = await getToken(provider, code);

    setCookie('accessToken', tokenData.data.token.accessToken);
    setCookie('refreshToken', tokenData.data.token.refreshToken);
    return { success: true };
  } catch (error) {
    console.error(`${provider} 인증 처리 실패:`, error);
    return { success: false, error };
  }
}
