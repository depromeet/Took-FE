'use client';

import { useState } from 'react';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { List, ListItem, ListItemText } from '@/shared/ui/list';

const AlramView = () => {
  const handleBack = useHistoryBack();
  const [isAlarmOn, setIsAlarmOn] = useState({
    all: false,
    interesting: false, // 흥미로운 명함 알림
    oneLineMemo: false, // 한 줄 메모 알림
    serviceUpdate: false, // 서비스 업데이트 알림
  });

  // 알림 설정 토글
  const handleToggleAlarm = (type: keyof typeof isAlarmOn) => {
    if (type === 'all') {
      setIsAlarmOn({
        all: !isAlarmOn.all,
        interesting: !isAlarmOn.all,
        oneLineMemo: !isAlarmOn.all,
        serviceUpdate: !isAlarmOn.all,
      });
    } else {
      setIsAlarmOn({ ...isAlarmOn, [type]: !isAlarmOn[type] });
    }
  };

  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <Appbar page="mypage" title="알림 설정" onLeftClick={handleBack} />
      <section className={cn(spacingStyles({ paddingTop: 'md', paddingX: 'ml' }))}>
        <List variant="alramItem">
          <AlarmItem text="전체 알림" onToggle={() => handleToggleAlarm('all')} isAlarmOn={isAlarmOn.all} />
        </List>
      </section>
      <AlarmBoarder />
      <section className={cn(spacingStyles({ paddingX: 'ml' }))}>
        <AlarmItem
          text="흥미로운 명함 알림"
          onToggle={() => handleToggleAlarm('interesting')}
          isAlarmOn={isAlarmOn.interesting}
        />
        <AlarmItem
          text="한 줄 메모 알림"
          onToggle={() => handleToggleAlarm('oneLineMemo')}
          isAlarmOn={isAlarmOn.oneLineMemo}
        />
        <AlarmItem
          text="서비스 업데이트 알림"
          onToggle={() => handleToggleAlarm('serviceUpdate')}
          isAlarmOn={isAlarmOn.serviceUpdate}
        />
      </section>
    </div>
  );
};

type AlarmItemProps = {
  text: string;
  onToggle?: () => void;
  isAlarmOn: boolean;
};

const AlarmItem = ({ text, onToggle, isAlarmOn }: AlarmItemProps) => {
  return (
    <ListItem variant="alramItem">
      <div className="flex w-full items-center">
        <AlarmItemText text={text} />
        <div className={cn(spacingStyles({ marginLeft: 'md' }))}>
          <AlarmIcon onToggle={onToggle} isAlarmOn={isAlarmOn} />
        </div>
      </div>
    </ListItem>
  );
};

AlarmItem.displayName = 'AlarmItem';
type AlarmItemTextProps = {
  text: string;
};

const AlarmItemText = ({ text }: AlarmItemTextProps) => {
  return <ListItemText variant="alramItem">{text}</ListItemText>;
};

AlarmItemText.displayName = 'AlarmItemText';

const AlarmBoarder = () => {
  return <div className="flex h-[4px] w-full flex-shrink-0 bg-gray-800" />;
};

AlarmBoarder.displayName = 'AlarmBoarder';

type AlarmIconProps = {
  onToggle?: () => void;
  isAlarmOn: boolean;
};

const AlarmIcon = ({ onToggle, isAlarmOn }: AlarmIconProps) => {
  return (
    <div onClick={onToggle} className="cursor-pointer">
      <div
        className={cn(
          'relative h-[30px] w-[52px] rounded-full p-[2px] transition-all duration-300',
          isAlarmOn ? 'bg-[#6535FF]' : 'bg-[#41425D]',
        )}
      >
        <div
          className={cn(
            'absolute h-[26px] w-[26px] rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out',
            isAlarmOn ? 'translate-x-[24px]' : 'translate-x-0',
          )}
        />
      </div>
    </div>
  );
};

AlarmIcon.displayName = 'AlarmIcon';

export default AlramView;
