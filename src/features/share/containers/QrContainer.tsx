'use client';

import { useParams } from 'next/navigation';

import { Typography } from '@/shared/ui/typography';

import { QrInfo } from '../components/QrInfo';
import { QrLogo } from '../components/QrLogo';
import { ShareButton } from '../components/ShareButton';

import { BackgroundContainer } from './BackgroundContainer';

type Params = {
  profileImg: string;
  name: string;
  jobName: string;
  jobType: 'designer' | 'developer';
  linkUrl: string;
};

const EXAM_PARAMS: Params = {
  profileImg:
    'https://https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp',
  name: '이재인',
  jobName: 'UX Designer',
  jobType: 'designer',
  linkUrl: 'https://github.com/JaeIn1',
};

export const QrContainer = () => {
  const params = useParams<Params>();

  if (!params) return null;

  const backgroundStyle = {
    backgroundColor: params.jobType === 'developer' ? 'rgba(12, 109, 255, 0.4)' : 'rgba(92, 45, 255, 0.4)',
  };

  return (
    <>
      <BackgroundContainer jobType={params.jobType} />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div
          className="flex h-[478px] w-[320px] flex-col items-center justify-end rounded-[24px] px-[30px] pb-10 pt-[28px]"
          style={backgroundStyle}
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <QrLogo />
              <ShareButton {...EXAM_PARAMS} />
            </div>
            <Typography className="pb-[14px] pt-[18px]" variant="title-2">
              QR을 찍어 명함을 교환해 보세요
            </Typography>
          </div>
          <QrInfo {...EXAM_PARAMS} />
        </div>
        <Typography className="pt-[24px]" variant="body-5" style={{ color: 'var(--gray-600)' }}>
          아래로 스와이프하면 홈 화면으로 돌아갈 수 있어요
        </Typography>
      </div>
    </>
  );
};
