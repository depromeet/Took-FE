'use client';

import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCookies from '@/shared/hooks/useCookies';
import useDevice from '@/shared/hooks/useDevice';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { List, ListItem, ListItemText } from '@/shared/ui/list';
import { ArrowBtn } from '@/shared/ui/list/wrappedList';
import { Navbar } from '@/shared/ui/Navigation';
import Toast from '@/shared/ui/Toast';
import { sendMessageToNative } from '@/shared/utils/nativeBridge';

import useLogout from '../hooks/useLogout';

import LogoutDialog from './dialog/logout';

const SettingView = () => {
  const { isMobileDevice } = useDevice();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 사이드에서만 마운트 상태 업데이트
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 로그아웃
  const { logout } = useLogout();

  const { getValue } = useCookies();
  const refreshToken = getValue('refreshToken');

  const handleLogout = () => {
    logout({ refreshToken: refreshToken as string });
  };

  const handleWithdraw = () => {
    router.push('/setting/user-quit');
  };

  const handleAlram = () => {
    router.push('/setting/alram');
  };

  const handleRouter = () => {
    router.push('/setting/alram-list');
  };

  const handlePrivacyTerms = () => {
    router.push('/setting/privacy-terms');
  };

  const handleTerms = () => {
    router.push('/setting/terms');
  };

  const handleInquiry = () => {
    if (isMobileDevice) {
      sendMessageToNative({
        // 문의사항 페이지 열기
        type: 'OPEN_INQUIRY_PAGE',
      });
    } else {
      window.open('https://forms.gle/FsAdnW5s5LVJkmBTA', '_blank');
    }
  };

  // 마운트 상태에 따라 알림 설정 항목 표시 여부 결정
  const showAlarmSettings = isMounted && isMobileDevice;

  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <section>
        <Appbar page="main" router={handleRouter} />
      </section>
      <section className={cn(spacingStyles({ paddingY: 'md', paddingX: 'ml' }))}>
        <List variant="settingItem">
          <Label className="text-body-3 text-gray-400">기타</Label>
          {showAlarmSettings && <SettingItem text="알림 설정" onClick={handleAlram} />}
          <SettingItem text="이용 약관" onClick={handleTerms} />
          <SettingItem text="개인정보처리약관" onClick={handlePrivacyTerms} />
          <SettingItem text="문의사항" onClick={handleInquiry} />

          <Label className={cn('text-body-3 text-gray-400', spacingStyles({ marginTop: 'ms' }))}>계정</Label>
          <LogoutDialog trigger={<SettingItem text="로그아웃" />} onConfirm={handleLogout} />
          <SettingItem text="회원 탈퇴" onClick={handleWithdraw} />
        </List>
      </section>
      <footer>
        <Navbar />
      </footer>
      <Toast />
    </div>
  );
};

type SettingItemProps = {
  text: string;
  onClick?: () => void;
};

const SettingItem = ({ text, onClick }: SettingItemProps) => {
  return (
    <ListItem variant="settingItem" onClick={onClick}>
      <div className="flex w-full items-center">
        <ListItemText variant="settingItem">{text}</ListItemText>
        <div className={cn(spacingStyles({ marginLeft: 'md' }))}>
          <ArrowBtn />
        </div>
      </div>
    </ListItem>
  );
};

export default SettingView;
