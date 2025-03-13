export const googleLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_LOCAL;

  if (!clientId || !redirectUri) {
    console.error('구글 로그인 설정이 잘못되었습니다.');
    return;
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  window.location.href = googleAuthUrl;
};
