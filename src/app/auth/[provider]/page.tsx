'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { handleSocialAuth, SocialProvider } from '@/features/auth/login/apis/getToken';
import { RedirectDto } from '@/features/auth/login/types/auth';
import { client } from '@/shared/apis/client';

export default function SocialAuthCallbackPage({ params }: { params: { provider: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = params.provider.toUpperCase() as SocialProvider;

    console.log(provider);

    const processAuth = async () => {
      try {
        const result = await handleSocialAuth(provider, code as string);

        if (result.success) {
          // API 호출
          const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/${provider}`;
          const response = await client.get<RedirectDto>(apiUrl);

          console.log('API 응답:', response.data);

          // 응답 상태가 CONTINUE이고 리다이렉트 URL이 있는 경우
          if (response.status === 'CONTINUE' && response.data.url) {
            // 리다이렉트 URL로 이동
            window.location.href = response.data.url;
          } else {
            // 다른 상태인 경우 처리
            router.push('/login');
          }
        } else {
          console.log('redirect error');
        }
      } catch (err) {
        console.error('인증 처리 중 오류:', err);
      }
    };

    processAuth();
  }, [searchParams, params.provider, router]);

  return <div>로그인 진행중..</div>;
}
