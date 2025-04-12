'use client';

import Image from 'next/image';
import Link from 'next/link';

import useDevice from '@/shared/hooks/useDevice';
import { useSpacing } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

import { getAuthUrl } from '../config/authConfig';
import { loginProviderConfig } from '../config/loginProviderConfig';
import { SocialProvider } from '../types/auth';
import { sendGoogleLoginMessage } from '../utils/nativeBridge';

interface LoginButtonProps {
  provider: SocialProvider;
}
/**
 * LoginButton 컴포넌트
 *
 * @description 소셜 로그인 버튼을 렌더링하는 컴포넌트입니다.
 * 제공자(provider)에 따라 적절한 아이콘, 텍스트, 스타일 및 로그인 함수가 적용됩니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {SocialProvider} props.provider - 소셜 로그인 제공자 타입 (kakao, google, apple)
 *
 * @example
 * // 카카오 로그인 버튼
 * <LoginButton provider="kakao" />
 *
 * // 구글 로그인 버튼
 * <LoginButton provider="google" />
 *
 * // 애플 로그인 버튼
 * <LoginButton provider="apple" />
 *
 * @returns {JSX.Element} 소셜 로그인 버튼 컴포넌트
 */

function LoginButton({ provider }: LoginButtonProps) {
  const iconSpacing = useSpacing({ paddingRight: 'xs' });
  const config = loginProviderConfig[provider];
  const authUrl = getAuthUrl[provider]();
  const { isWebView } = useDevice();

  const handleClick = (e: React.MouseEvent) => {
    if (isWebView && provider === 'GOOGLE') {
      e.preventDefault();
      sendGoogleLoginMessage(authUrl);
    }
  };

  // TODO: 애플 로그인 기능 적용 시 제거될 코드
  if (provider === 'APPLE') {
    return (
      <div
        onClick={handleClick}
        className={`flex w-full items-center justify-center rounded-md ${config.bgColor} px-4 py-[15px] ${config.textColor}`}
      >
        <Image src={config.icon} alt={`${provider} 로그인`} width={20} height={20} className={iconSpacing} />
        <Typography variant="body-4">{config.text}</Typography>
      </div>
    );
  }

  return (
    <Link
      href={authUrl}
      onClick={handleClick}
      className={`flex w-full items-center justify-center rounded-md ${config.bgColor} px-4 py-[15px] ${config.textColor}`}
    >
      <Image src={config.icon} alt={`${provider} 로그인`} width={20} height={20} className={iconSpacing} />
      <Typography variant="body-4">{config.text}</Typography>
    </Link>
  );
}

export default LoginButton;
