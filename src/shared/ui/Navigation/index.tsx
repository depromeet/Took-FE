'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils';

import { Typography } from '../typography';

import { MyCardIcon } from './icons/MyCardIcon';
import { ReceivedCardIcon } from './icons/ReceivedCardIcon';
import { SettingIcon } from './icons/SettingIcon';

const TEMP_RECEIVED_URL = '/received';
const TEMP_SETTING_URL = '/setting';

const getStrokeColor = (condition: boolean) => (condition ? 'var(--gray-75)' : 'var(--gray-600)');

export const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const myCardFillColor = getStrokeColor(pathName === '/');
  const receivedCardFillColor = getStrokeColor(pathName === TEMP_RECEIVED_URL);
  const settingFillColor = getStrokeColor(pathName === TEMP_SETTING_URL);

  const goToHome = () => router.push('/');
  const goToReceived = () => router.push(TEMP_RECEIVED_URL);
  const goToSetting = () => router.push(TEMP_SETTING_URL);

  console.log(settingFillColor);

  return (
    <section className="fixed bottom-0 z-bar flex h-[80px] w-full max-w-[600px] items-center justify-between rounded-t-[20px] bg-gray-800 px-5">
      <NavItem onClick={goToHome}>
        <MyCardIcon fillColor={myCardFillColor} />
        <Typography variant="caption-1" style={{ color: myCardFillColor }}>
          내 명함
        </Typography>
      </NavItem>
      <NavItem onClick={goToReceived}>
        <ReceivedCardIcon fillColor={receivedCardFillColor} />
        <Typography variant="caption-1" style={{ color: receivedCardFillColor }}>
          받은 명함
        </Typography>
      </NavItem>
      <NavItem onClick={goToSetting}>
        <SettingIcon fillColor={settingFillColor} />
        <Typography variant="caption-1" style={{ color: settingFillColor }}>
          설정
        </Typography>
      </NavItem>
    </section>
  );
};

export const NavItem = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { className, ...rest } = props;

  return (
    <nav className={cn('flex cursor-pointer flex-col items-center justify-center px-[18px]', className)} {...rest}>
      {children}
    </nav>
  );
};
