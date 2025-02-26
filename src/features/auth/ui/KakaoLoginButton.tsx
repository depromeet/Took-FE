'use client';

import { kakaoLogin } from '../model/providers/kakao';

function KakaoLoginButton() {
  const KakaoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0C4.0294 0 0 3.22067 0 7.2C0 9.74133 1.5882 11.9607 4.0294 13.26C3.8922 13.788 3.1569 16.0093 3.0882 16.3893C3.0882 16.3893 3.0441 16.686 3.2598 16.7887C3.4755 16.8913 3.7059 16.7473 3.7059 16.7473C4.1961 16.542 6.9706 14.6847 7.6471 14.2233C8.0785 14.2773 8.5245 14.3887 9 14.3887C13.9706 14.3887 18 11.168 18 7.18867C18 3.20933 13.9706 0 9 0Z"
        fill="black"
      />
    </svg>
  );

  return (
    <button onClick={kakaoLogin} className="flex items-center rounded bg-yellow-300 px-4 py-2">
      <span className="mr-2">
        <KakaoIcon />
      </span>
      카카오 로그인
    </button>
  );
}

export default KakaoLoginButton;
