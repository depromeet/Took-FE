import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { parse } from 'querystring';

import { AuthDto } from '@/features/auth/login/types/auth';
import { CLIENT_SIDE_URL } from '@/shared/constants';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookie = cookies();

  try {
    const body = await request.text();
    const formData = parse(body);

    const code = formData['code'];
    const idToken = formData['id_token'];

    if (!code || !idToken) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('login-failed', 'true');

      return NextResponse.redirect(redirectUrl, 302);
    }

    const res = await fetch(`${CLIENT_SIDE_URL}/api/auth/login/APPLE?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('login-failed', 'true');

      return NextResponse.redirect(redirectUrl, 302);
    }

    if (!res.ok) {
      return NextResponse.json({ error: `서버 요청 실패` }, { status: res.status });
    }

    const data = (await res.json()) as { data: AuthDto };

    const token = data.data.token;
    const { accessToken, refreshToken } = token;

    cookie.set('accessToken', accessToken);
    cookie.set('refreshToken', refreshToken);

    const loginUrl = new URL('/', request.url);

    return NextResponse.redirect(loginUrl, 302);
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
