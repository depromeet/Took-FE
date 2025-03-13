import Image from 'next/image';

import LoginButton from './LoginButton';

export function LoginFeature() {
  const imgUrl = '/images/login/onboarding/onboarding-login.png';
  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex h-full w-full flex-col items-center justify-between">
        {/* 이미지 배치가 안되서 임시로 top-[45%]사용했습니다. */}
        <div className="absolute left-1/2 top-[45%] h-[23%] w-full -translate-x-1/2 -translate-y-1/2 transform">
          {/* 이미지 가운데 배치가 안되서 임시로 pl-[1rem]사용했습니다. */}
          <Image src={imgUrl} alt="온보딩 이미지" fill className="object-contain pl-[1rem]" priority />
        </div>

        <div className="absolute bottom-0 w-full space-y-4 px-6 pb-10">
          <LoginButton provider="GOOGLE" />
          <LoginButton provider="APPLE" />
          <LoginButton provider="KAKAO" />
        </div>
      </div>
    </div>
  );
}
