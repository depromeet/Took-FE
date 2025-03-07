'use client';

import Image from 'next/image';

import { useSpacing } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

import { loginProviderConfig } from '../config/loginProviderConfig';
import { SocialProvider } from '../types/auth';

interface LoginButtonProps {
  provider: SocialProvider;
}

function LoginButton({ provider }: LoginButtonProps) {
  const iconSpacing = useSpacing({ paddingRight: 'xs' });
  const config = loginProviderConfig[provider];

  return (
    <button
      onClick={config.loginFn}
      className={`flex w-full items-center justify-center rounded-md ${config.bgColor} px-4 py-[15px] ${config.textColor}`}
    >
      <Image src={config.icon} alt={`${provider} 로그인`} width={20} height={20} className={iconSpacing} />
      <Typography variant="body-4">{config.text}</Typography>
    </button>
  );
}

export default LoginButton;
