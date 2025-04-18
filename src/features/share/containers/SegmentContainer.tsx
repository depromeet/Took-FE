import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui/typography';

type Props = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
} & HTMLAttributes<HTMLDivElement>;

export const SegmentContainer = ({ className, currentTab, setCurrentTab, ...restProps }: Props) => {
  const myCardTextColor = currentTab === 'myCard' ? '#202030' : '#ffffff';
  const nearbyCardTextColor = currentTab === 'nearbyCard' ? '#202030' : '#ffffff';
  const bgTranslateClass = currentTab === 'myCard' ? 'translate-x-[3%]' : 'translate-x-[103%]';

  return (
    <div
      className={cn(
        className,
        'relative mb-[26px] flex h-[48px] w-[260px] items-center justify-center',
        'rounded-[24px] bg-gray-700',
        'ease-[ease] transition-all duration-0',
      )}
      {...restProps}
    >
      <div
        className={cn(
          'absolute left-0 z-0 h-[40px] w-[126px] rounded-[20px] bg-white',
          'ease-[ease] duration-180 transform transition-transform',
          bgTranslateClass,
        )}
      />

      <Typography
        variant="body-5"
        style={{
          zIndex: 1,
          display: 'flex',
          height: '40px',
          width: '126px',
          alignItems: 'center',
          justifyContent: 'center',
          color: myCardTextColor,
          cursor: 'pointer',
        }}
        onClick={() => setCurrentTab('myCard')}
      >
        내 명함 공유
      </Typography>

      <Typography
        variant="body-5"
        style={{
          zIndex: 1,
          display: 'flex',
          height: '40px',
          width: '126px',
          alignItems: 'center',
          justifyContent: 'center',
          color: nearbyCardTextColor,
          cursor: 'pointer',
        }}
        onClick={() => setCurrentTab('nearbyCard')}
      >
        주변 사람에게 공유
      </Typography>
    </div>
  );
};
