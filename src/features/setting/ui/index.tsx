import { Label } from '@radix-ui/react-label';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { List, ListItem, ListItemText } from '@/shared/ui/list';
import { ArrowBtn } from '@/shared/ui/list/wrappedList';

const SettingView = () => {
  return (
    <List variant="settingItem">
      <Label className="text-body-3 text-gray-400">기타</Label>
      <SettingItem text="알림 설정" />
      <SettingItem text="이용 약관" />
      <SettingItem text="개인정보처리약관" />

      <Label className={cn('text-body-3 text-gray-400', spacingStyles({ marginTop: 'ms' }))}>계정</Label>
      <SettingItem text="로그아웃" />
      <SettingItem text="회원 탈퇴" />
    </List>
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
