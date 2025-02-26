'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';

// import { handleSocialAuth, type SocialProvider } from '@/features/auth/model';

export default function SocialAuthCallbackPage({ params }: { params: { provider: string } }) {
  console.log(params);
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // useEffect(() => {
  //   const code = searchParams.get('code');
  //   const provider = params.provider as SocialProvider;

  //   const processAuth = async () => {
  //     try {
  //       const result = await handleSocialAuth(provider, code as string);
  //       console.log(result);
  //     } catch (err) {
  //       console.error('인증 처리 중 오류:', err);
  //     }
  //   };

  //   processAuth();
  // }, [searchParams, params.provider, router]);

  return <div>로그인 진행중..</div>;
}
