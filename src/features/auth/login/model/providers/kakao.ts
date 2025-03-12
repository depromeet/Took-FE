'use client';

export const PROVIDER_ID = 'KAKAO';

export const kakaoLogin = () => {
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOCAL;

  if (!restApiKey || !redirectUri) {
    console.error('카카오 로그인 설정이 잘못되었습니다.');
    return;
  }

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  window.location.href = kakaoAuthUrl;
};
