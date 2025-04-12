import { QRCodeSVG } from 'qrcode.react';

import WrappedAvatar from '@/shared/ui/Avatar';
import { Typography } from '@/shared/ui/typography';

import { JobLogo } from './JobLogo';
import { QrBackground } from './QrBackground';

type Props = {
  profileImg: string;
  name: string;
  jobName: string;
  jobType: 'DESIGNER' | 'DEVELOPER';
  linkUrl: string;
};

export const QrInfo = ({ profileImg, name, jobName, jobType, linkUrl }: Props) => {
  return (
    <div className="relative">
      <div className="absolute flex h-full w-full flex-col justify-between px-[27px] pb-6 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <WrappedAvatar src={profileImg} alt={name} size="xsmall" />
            <div className="flex flex-col">
              <Typography variant="title-3" style={{ color: 'var(--gray-800)' }}>
                {name}
              </Typography>
              <Typography variant="caption-1" style={{ color: 'var(--gray-800)' }}>
                {jobName}
              </Typography>
            </div>
          </div>
          <JobLogo jobType={jobType} />
        </div>
        <QRCodeSVG value={linkUrl} size={206} level="H" />
      </div>
      <QrBackground />
    </div>
  );
};
