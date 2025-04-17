'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Typography } from '@/shared/ui/typography';

type Props = {
  profileImg: string;
  name: string;
  jobDetail: string;
};

export const NearbyProfile = ({ profileImg, name, jobDetail }: Props) => {
  const [imageSrc, setImageSrc] = useState(profileImg || '/icon/default-image-s.svg');

  useEffect(() => {
    setImageSrc(profileImg || '/icon/default-image-s.svg');
  }, [profileImg]);

  return (
    <div className="flex h-[58px] w-[282px] items-center gap-[12px] rounded-full bg-[rgba(255,255,255,0.20)] px-[12px]">
      <div className="h-[42px] w-[42px] rounded-full">
        <Image src={imageSrc} alt={name} width={42} height={42} />
      </div>
      <div className="flex flex-col">
        <Typography variant="body-4">{name}</Typography>
        <Typography variant="caption-1">{jobDetail}</Typography>
      </div>
    </div>
  );
};
