import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';

type BallPropsType = {
  tagCount: number;
};

/**
 * Ball : 태그 구슬

 */
function Ball({ tagCount }: BallPropsType) {
  const circleStyles = ['absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  overflow-hidden rounded-full'];

  const shadowStyles = [
    'shadow-[0px_0px_11.9px_rgba(103,68,255,0.2),_inset_0px_0px_54.5px_rgba(208,195,255,0.2)]',
    'shadow-[0px_0px_11.9px_rgba(103,68,255,0.3),_inset_0px_0px_54.5px_rgba(208,195,255,0.3)]',
  ];

  return (
    <>
      <div
        className={cn(
          'pointer-events-none z-10 h-[494px] w-[494px] opacity-40',
          circleStyles.join(' '),
          shadowStyles[0],
          'firstWave',
        )}
      />
      <div
        className={cn(
          'pointer-events-none z-20 h-72 w-72 opacity-50',
          circleStyles.join(' '),
          shadowStyles[1],
          'secondWave',
        )}
      />
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
    </>
  );
}

export default Ball;
