'use client';

import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { List, ListItem, ListItemText } from '@/shared/ui/list';
import { ArrowBtn } from '@/shared/ui/list/wrappedList';
import { Navbar } from '@/shared/ui/Navigation';

import LogoutDialog from './dialog/logout';

const SettingView = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const handleUserQuit = () => {
    router.push('/setting/user-quit');
  };

  const handleAlram = () => {
    router.push('/setting/alram');
  };

  const handleRouter = () => {
    router.push('/setting/alram-list');
  };

  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <section>
        <Appbar page="main" router={handleRouter} />
      </section>
      <section className={cn(spacingStyles({ paddingY: 'md', paddingX: 'ml' }))}>
        <List variant="settingItem">
          <Label className="text-body-3 text-gray-400">기타</Label>
          <SettingItem text="알림 설정" onClick={handleAlram} />
          <SettingItem text="이용 약관" />
          <SettingItem text="개인정보처리약관" />

          <Label className={cn('text-body-3 text-gray-400', spacingStyles({ marginTop: 'ms' }))}>계정</Label>
          <LogoutDialog trigger={<SettingItem text="로그아웃" />} onConfirm={handleLogout} />
          <SettingItem text="회원 탈퇴" onClick={handleUserQuit} />
        </List>
      </section>
      <footer>
        <Navbar />
      </footer>
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
