'use client';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing/spacing';
import Appbar from '@/shared/ui/appbar';
import { List, ListItem } from '@/shared/ui/list';
import { Typography } from '@/shared/ui/typography';

const alarmItems = [
  {
    id: '1',
    icon: { type: 'interesting' as const },
    description: '방금 나와 "관심 도메인"이(가) 같은 사람을 발견했어요! 어떤 사람인지 살펴보세요',
    date: '12시간 전',
  },
  {
    id: '2',
    icon: { type: 'interesting' as const },
    description: '방금 나와 공통점이 같은 사람을 발견했어요! 어떤 사람인지 살펴보세요',
    date: '12시간 전',
  },
  {
    id: '3',
    icon: { type: 'oneLineMemo' as const },
    description: '오늘 공유한 명함을 특별하게 만들어 볼까요? 다음 만남이 훨씬 자연스러워질 거예요',
    date: '12시간 전',
  },
  {
    id: '4',
    icon: { type: 'system' as const },
    description: '새로운 기능이 찾아왔어요! 지금 바로 확인해 보세요',
    date: '12시간 전',
  },
];

const AlaramView = () => {
  const handleBack = useHistoryBack();

  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <Appbar page="mypage" title="알림" onLeftClick={handleBack} />
      <section className={cn(spacingStyles({ paddingX: 'ml' }))}>
        <AlarmListView items={alarmItems} />
      </section>
      <div className={cn('flex items-center justify-center', spacingStyles({ paddingY: 'ms' }))}>
        <button>
          <Typography variant="caption-1">이전 알림 보기</Typography>
          <AlarmBoader />
        </button>
      </div>
    </div>
  );
};

/**
 * @TODO
 * 알림 목록 조회 API 연동 후 데이터 형식 변경 필요
 */

type AlarmItem = {
  id: string;
  icon: AlarmItemIconProps;
  description: string;
  date: string;
};

type AlarmListViewProps = {
  items: AlarmItem[];
};

const AlarmListView = ({ items }: AlarmListViewProps) => {
  return (
    <List variant="alarmList">
      {items.map((item, idx) => (
        <div className="flex flex-col" key={item.description}>
          <AlarmItemComponent key={item.description} {...item} />
          {idx !== items.length - 1 && <AlarmBoader />}
        </div>
      ))}
    </List>
  );
};

const AlarmBoader = () => {
  return <div className="h-[1px] w-full bg-gray-600" />;
};

type AlarmItemIconProps = {
  type: 'interesting' | 'oneLineMemo' | 'system';
};

type AlarmItemProps = {
  icon: AlarmItemIconProps;
  description: string;
  date: string;
};

const AlarmItemComponent = ({ icon, description, date }: AlarmItemProps) => {
  return (
    <ListItem variant="alarmList">
      <div className="flex w-full items-start gap-[7px]">
        <AlarmItemIcon type={icon.type} />
        <div className="flex flex-1 gap-[7px] sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-[240px] flex-1 text-body-5 text-gray-50">{description}</div>
          <div className="h-[12px] w-[42px] text-caption-2 text-gray-500">{date}</div>
        </div>
      </div>
    </ListItem>
  );
};

const AlarmItemIcon = ({ type }: AlarmItemIconProps) => {
  const ICON_MAP = {
    interesting: <InterestingIcon />,
    oneLineMemo: <OneLineMemoIcon />,
    system: <SystemIcon />,
  };

  return <>{ICON_MAP[type]}</>;
};

// icons
const InterestingIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#646486" />
      <path d="M17 17L22.5 22.5" stroke="#646486" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
      <path
        d="M10.5 20C5.5 20 1.5 16 1.5 11C1.5 6 5.5 2 10.5 2C15.5 2 19.5 6 19.5 11C19.5 16 15.5 20 10.5 20Z"
        stroke="#999CBF"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

const OneLineMemoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_2244_53092)">
        <path d="M15.4614 3.6968L3.06445 16.0938L7.7653 20.7946L20.1623 8.39765L15.4614 3.6968Z" fill="#999CBF" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.1049 6.46799L20.1669 8.41199L15.4629 3.70799L17.4009 1.76999C17.9229 1.24799 18.7749 1.24799 19.3029 1.76999L22.1049 4.57199C22.6329 5.08799 22.6329 5.93999 22.1049 6.46799Z"
          fill="#999CBF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.98021 22.356L4.27821 21.738L2.13021 19.59L1.51221 21.888C1.44021 22.176 1.69821 22.434 1.98021 22.356Z"
          fill="#646486"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.13086 19.596L4.27886 21.738L7.77086 20.808L3.06686 16.104L2.13086 19.596Z"
          fill="#D1D4E7"
        />
      </g>
      <defs>
        <clipPath id="clip0_2244_53092">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const SystemIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_2244_53103)">
        <mask id="mask0_2244_53103" maskUnits="userSpaceOnUse" x="2" y="1" width="20" height="20">
          <path
            d="M14.1076 19.3052C12.6922 19.6417 11.2138 19.6061 9.81625 19.2018C9.9048 18.7065 9.84354 18.196 9.6403 17.7356C9.43707 17.2753 9.10111 16.8861 8.67541 16.6178C8.24971 16.3495 7.75364 16.2143 7.25067 16.2295C6.7477 16.2447 6.26071 16.4096 5.85201 16.7032C5.47364 16.2765 5.13955 15.8125 4.85488 15.3183C4.41449 14.5555 4.10648 13.7523 3.92491 12.9355L3.95557 12.9178C4.32781 12.7031 4.63918 12.397 4.86027 12.0285C5.08135 11.6599 5.20487 11.2412 5.21915 10.8116C5.23343 10.3821 5.138 9.95606 4.94187 9.57367C4.74575 9.19128 4.4554 8.86519 4.09824 8.62619C4.49439 7.33559 5.19477 6.15903 6.14044 5.19554C6.53163 5.44968 6.98551 5.59065 7.45186 5.60285C7.9182 5.61504 8.37883 5.49799 8.78277 5.26464C9.18683 5.03148 9.51852 4.6911 9.74113 4.28113C9.96374 3.87117 10.0686 3.40762 10.0441 2.94176C11.3513 2.60454 12.7205 2.58627 14.0362 2.88849C14.0648 3.32033 14.2037 3.73761 14.4397 4.1004C14.6757 4.46318 15.0008 4.75933 15.384 4.96048C15.7672 5.16164 16.1956 5.26107 16.6283 5.24926C17.0609 5.23745 17.4832 5.1148 17.8549 4.89305C18.4862 5.47344 19.0253 6.14678 19.4535 6.88982C19.7442 7.39347 19.9772 7.91494 20.1545 8.44618C19.6959 8.65333 19.3095 8.99261 19.0449 9.42058C18.7802 9.84856 18.6492 10.3458 18.6688 10.8486C18.6883 11.3514 18.8574 11.837 19.1544 12.2431C19.4515 12.6493 19.8629 12.9576 20.3362 13.1286C19.9874 14.541 19.279 15.839 18.2799 16.8964C17.883 16.5364 17.3821 16.3117 16.8493 16.2547C16.3165 16.1977 15.7793 16.3113 15.3153 16.5793C14.8512 16.8472 14.4842 17.2555 14.2672 17.7454C14.0501 18.2353 13.9943 18.7815 14.1076 19.3052Z"
            fill="white"
            stroke="white"
            strokeWidth="2.06665"
            strokeLinejoin="round"
          />
          <path
            d="M13.6297 13.6595C13.9652 13.4658 14.2593 13.2079 14.4951 12.9006C14.7309 12.5933 14.9039 12.2425 15.0042 11.8683C15.1045 11.4941 15.13 11.1038 15.0795 10.7197C15.0289 10.3356 14.9032 9.96528 14.7095 9.62979C14.5158 9.29429 14.2579 9.00023 13.9506 8.7644C13.6432 8.52857 13.2924 8.35558 12.9182 8.25532C12.5441 8.15505 12.1538 8.12947 11.7697 8.18004C11.3856 8.2306 11.0152 8.35632 10.6798 8.55002C10.0022 8.94121 9.50778 9.58554 9.30528 10.3413C9.10279 11.097 9.2088 11.9022 9.59999 12.5798C9.99118 13.2573 10.6355 13.7517 11.3912 13.9542C12.147 14.1567 12.9522 14.0507 13.6297 13.6595Z"
            fill="black"
            stroke="black"
            strokeWidth="2.06665"
            strokeLinejoin="round"
          />
        </mask>
        <g mask="url(#mask0_2244_53103)">
          <path
            d="M-1.66211 7.40196L15.8562 -2.71224L25.9704 14.8061L8.45209 24.9203L-1.66211 7.40196Z"
            fill="#999CBF"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2244_53103">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AlaramView;
