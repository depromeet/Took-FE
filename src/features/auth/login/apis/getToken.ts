'use client';

import { setCookie } from 'cookies-next';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { AuthDto, SocialProvider } from '../types/auth';

export async function getToken(provider: SocialProvider, code: string): Promise<AuthDto> {
  try {
    const data = await client.post<null, AuthDto>(`${CLIENT_SIDE_URL}/api/auth/login/${provider}?code=${code}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleSocialAuth(provider: SocialProvider, code: string) {
  try {
    const tokenData: AuthDto = await getToken(provider, code);

    setCookie('accessToken', tokenData.data.data.token.accessToken);
    setCookie('refreshToken', tokenData.data.data.token.refreshToken);
    return { success: true };
  } catch (error) {
    console.error(`${provider} 인증 처리 실패:`, error);
    return { success: false, error };
  }
}
