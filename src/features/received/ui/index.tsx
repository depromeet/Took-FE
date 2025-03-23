import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Tag from '@/shared/ui/tag/tag';

import { useReceivedCardQuery } from '../model/queries/useReceivedCardQuery';

import ReceivedCard from './receivedCard';

export default function ReceivedCardView() {
  const tagStyle = 'bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';
  const { data } = useReceivedCardQuery();

  return (
    <main className="overflow-y-auto pb-24">
      <header className={cn('h-52 w-auto bg-opacity-white-20', spacingStyles({ marginTop: 'md' }))}></header>
      <div className={cn('flex items-center gap-2', spacingStyles({ paddingLeft: 'ml', paddingTop: 'md' }))}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-opacity-white-20">
          <Image src="/icons/folderIcon.svg" alt="폴더 아이콘" width={18} height={18} />
        </div>
        <div
          className={cn(
            'scrollbar-hide flex gap-2 overflow-x-auto whitespace-nowrap',
            spacingStyles({ paddingRight: 'ml' }),
          )}
        >
          <Tag size="lg" message="전체보기" className="bg-white text-black" />
          <Tag size="lg" message="디프만" className={tagStyle} />
          <Tag size="lg" message="YAPP" className={tagStyle} />
          <Tag size="lg" message="엘리스랩" className={tagStyle} />
        </div>
      </div>
      <div
        className={cn(
          'flex items-center justify-end gap-2 text-caption-1 text-white',
          spacingStyles({ marginY: 'md', paddingRight: 'ml' }),
        )}
      >
        <p>최근 공유 순</p>
        <Image className="cursor-pointer" src="/icons/downArrow.svg" alt="화살표 아이콘" width={12} height={12} />
      </div>
      <div className="flex flex-col gap-4">
        {data.map((value, index) => (
          <ReceivedCard key={index} cardData={value} />
        ))}
      </div>
    </main>
  );
}
