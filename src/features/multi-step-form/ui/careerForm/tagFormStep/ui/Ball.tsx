import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';

type BallPropsType = {
  readonly tagCount: number;
};

/**
 * Ball : 태그 구슬

 */
export function Ball({ tagCount }: BallPropsType) {
  return (
    <div
      className={cn(
        `absolute left-1/2 top-1/2 z-30 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[url(/images/tag/ball.png)] bg-cover bg-center`,
        'transition-all duration-500 ease-in-out',
        tagCount !== 0 && 'scale-[1.2]',
      )}
    >
      <Image
        src="/icons/icon_graphic_large.png"
        alt="그래픽 아이콘"
        width={46}
        height={46}
        className={cn('transition-opacity duration-500 ease-in-out', tagCount === 0 ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  );
}
