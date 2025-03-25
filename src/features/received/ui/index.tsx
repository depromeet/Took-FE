import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useBottomModal } from '@/features/card-detail/hooks/useBottomModal';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import Tag from '@/shared/ui/tag/tag';

import { useReceivedCardQuery } from '../model/queries/useReceivedCardQuery';

import ReceivedCard from './receivedCard';

export default function ReceivedCardView() {
  const tagStyle = 'bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';
  const { data } = useReceivedCardQuery();
  const folders = ['디프만', 'YAPP', '엘리스랩', '카카오'];
  const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();

  return (
    <main className="">
      <header className={cn('h-52 w-auto bg-opacity-white-20', spacingStyles({ marginTop: 'md' }))}></header>
      <div className={cn('flex items-center gap-2', spacingStyles({ paddingTop: 'md' }))}>
        <button
          onClick={headerRightHandler}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-opacity-white-20"
        >
          <Image src="/icons/folderIcon.svg" alt="폴더 아이콘" width={18} height={18} />
        </button>
        <div
          className={cn(
            'flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide',
            spacingStyles({ paddingRight: 'ml' }),
          )}
        >
          <Tag size="lg" message="전체보기" className="bg-white text-black" />
          {folders.map((folder, index) => {
            return <Tag key={index} size="lg" message={folder} className={tagStyle} />;
          })}
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
      <BottomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <BottomModalTitle>폴더 설정</BottomModalTitle>
        <BottomMenuItem
          onClick={() => console.log('asdf')}
          update={() => {}}
          delete={() => {
            closeModal();
            toast.success('폴더가 삭제되었어요');
          }}
        >
          디프만
        </BottomMenuItem>
        <BottomMenuItem onClick={() => console.log('asdf')} update={() => {}} delete={() => {}}>
          엘리스랩
        </BottomMenuItem>
        <button className={cn('flex gap-3', spacingStyles({ padding: 'ml' }))}>
          <Image src="/icons/addIcon.svg" alt="추가 아이콘" width={20} height={20} />
          <p className="text-body-3 text-gray-300">추가하기</p>
        </button>
      </BottomModal>
    </main>
  );
}
