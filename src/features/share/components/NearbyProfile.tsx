'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Typography } from '@/shared/ui/typography';

import { usePostMyCard } from '../hooks/mutations/usePostMyCard';

type Props = {
  userId: number;
  cardId: number;
  profileImg: string;
  name: string;
  jobDetail: string;
};

export const NearbyProfile = ({ userId, cardId, profileImg, name, jobDetail }: Props) => {
  const [imageSrc, setImageSrc] = useState(profileImg || '/icon/default-image-s.svg');

  const { mutate: postMyCard } = usePostMyCard();

  const onClickPostMyCard = () => {
    postMyCard({
      userId,
      cardId,
    });
  };

  useEffect(() => {
    setImageSrc(profileImg || '/icon/default-image-s.svg');
  }, [profileImg]);

  return (
    <div
      className="flex min-h-[58px] w-[282px] cursor-pointer items-center gap-[12px] rounded-full bg-[rgba(255,255,255,0.20)] px-[12px]"
      onClick={onClickPostMyCard}
    >
      <div className="h-[42px] w-[42px] overflow-hidden rounded-full">
        <Image
          src={imageSrc}
          alt={name}
          width={42}
          height={42}
          className="rounded-full object-cover"
          onError={() => setImageSrc('/icon/default-image-s.svg')}
        />
      </div>
      <div className="flex flex-col">
        <Typography variant="body-4">{name}</Typography>
        <Typography variant="caption-1">{jobDetail}</Typography>
      </div>
    </div>
  );
};
