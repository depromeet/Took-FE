import Image from 'next/image';
import React from 'react';

import WrappedAvatar from '@/shared/ui/Avatar';

type EmptyCardProps = {
  message?: string;
};

export default function EmptyPeople({ message = '주변에 Took을 사용하는 사람이 없어요' }: EmptyCardProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative pb-4">
        <WrappedAvatar size="medium" />
        <Image
          className="absolute -right-1 -top-1"
          src="/icons/infoIcon.svg"
          alt="주변에 Took을 사용하는 사람이 없어요"
          width={22}
          height={22}
        />
      </div>
      <p className="text-body-3 text-gray-50">{message}</p>
    </div>
  );
}
