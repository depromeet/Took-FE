import { LoginBackgroundContainer } from '@/features/login/containers/LoginBackgroundContainer';

import LoginButton from './LoginButton';

export function LoginFeature() {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[600px] flex-col overflow-hidden">
      <LoginBackgroundContainer />
      <div className="absolute bottom-0 w-full space-y-4 px-6 pb-10">
        <LoginButton provider="APPLE" />
        <LoginButton provider="GOOGLE" />
        <LoginButton provider="KAKAO" />
      </div>
    </div>
  );
}
