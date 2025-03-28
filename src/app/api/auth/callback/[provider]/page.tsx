'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { handleSocialAuth } from '@/features/auth/login/apis/getToken';
import { SocialProvider } from '@/features/auth/login/types/auth';

export default function SocialAuthCallbackPage({ params }: { params: { provider: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    const provider = params.provider.toUpperCase() as SocialProvider;

    const processAuth = async () => {
      try {
        const result = await handleSocialAuth(provider, code as string);
        if (result.success) {
          router.replace('/');
        }
      } catch (err) {
        console.error('인증 처리 중 오류:', err);
      }
    };

    processAuth();
  }, [params.provider, searchParams, router]);

  return null;
}
