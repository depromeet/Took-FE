import router from 'next/router';
import { NextRequest, NextResponse } from 'next/server';

import { handleSocialAuth } from '@/features/auth/login/apis/getToken';

export async function POST(request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    // JSON 형태로 code가 넘어온다고 가정
    const { code, id_token } = await request.json();

    console.log('Provider:', params.provider);
    console.log('Received code:', code);
    console.log('Received id_token:', id_token);

    try {
      const result = await handleSocialAuth('APPLE', code as string);
      if (result.success) {
        router.replace('/');
      }
    } catch (err) {
      console.error('인증 처리 중 오류:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'POST request received',
      provider: params.provider,
      code,
      id_token,
    });
  } catch (error: any) {
    console.error('POST request error:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Invalid request' }, { status: 400 });
  }
}
