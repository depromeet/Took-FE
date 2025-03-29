import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Folder } from '@/entities/folder/types';
import { useBottomModal } from '@/features/card-detail/hooks/useBottomModal';
import { Card } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import Tag from '@/shared/ui/tag/tag';

import { useFolderStore } from '../model/store/useFoldersStore';
// import { useReceivedCardsStore } from '../model/store/useReceivedCardsStore';

import Intellibanner from './intellibanner';
import ReceivedCard from './receivedCard';

type ReceivedCardViewProps = {
  cards: Card[];
  folders: Folder[];
  setSelectedFolderId: (id: number | null) => void;
};

export default function ReceivedCardView({ cards, folders, setSelectedFolderId }: ReceivedCardViewProps) {
  const tagStyle = 'bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';

  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 수정 버튼 누름 여부
  const [isAdd, setIsAdd] = useState<boolean>(false); // 추가하기 버튼 누름 여부

  const [folderName, setFolderName] = useState<string>(''); // 수정하려는 폴더의 기존 이름
  const [folderIndex, setFolderIndex] = useState<number>(0); // 수정하려는 폴더의 인덱스
  const [newFolderName, setNewFolderName] = useState<string>(''); // 수정하려는 폴더의 새로운 이름
  const [updatedFolderName, setUpdatedFolderName] = useState<string>(folderName); // 수정하려는 폴더의 새로운 이름

  const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();
  // const { folders, addFolder, updateFolder, deleteFolder } = useFolderStore();
  const { addFolder, updateFolder, deleteFolder } = useFolderStore();
  // const { receivedCards } = useReceivedCardsStore();

  const handleFolderSelect = (id: number | null) => {
    setSelectedFolderId(id);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleUpdate = (folder: string) => {
    setFolderName(folder);
    setIsUpdate(true);
  };
  const handleDelete = (folder: string) => {
    deleteFolder(folder);
    closeModal();
    toast.success('폴더가 삭제되었어요.');
  };

  const handleUpdateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = folders.findIndex((folder) => folder.name === folderName);
    setFolderIndex(index);
    console.log(folderIndex);
    if (e.key == 'Enter') {
      e.preventDefault();
      updateFolder(folderName, updatedFolderName);
      closeModal();
      toast.success('수정이 완료되었어요.');
    }
  };
  const handleAddKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      addFolder(newFolderName);
      closeModal();
      toast.success('폴더가 추가되었어요.');
      console.log(folders);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setIsUpdate(false);
      setIsAdd(false);
    }
  }, [isModalOpen]);

  return (
    <main className="">
      <Intellibanner />
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
          <Tag size="lg" message="전체보기" className="bg-white text-black" onClick={() => handleFolderSelect(null)} />
          {folders.map((folder, index) => {
            return (
              <Tag
                key={index}
                size="lg"
                message={folder.name}
                className={tagStyle}
                onClick={() => handleFolderSelect(folder.id)}
              />
            );
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
        {/* {receivedCards.map((value, index) => ( */}
        {cards.map((value, index) => (
          <ReceivedCard key={index} cardData={value} />
        ))}
      </div>
      <BottomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        {isUpdate ? (
          <>
            <BottomModalTitle>폴더 이름 설정</BottomModalTitle>
            <input
              defaultValue={folderName}
              className={cn('h-16 w-full bg-gray-600 outline-none', spacingStyles({ padding: 'ml' }))}
              onKeyDown={handleUpdateKeyDown}
              onChange={(e) => setUpdatedFolderName(e.target.value)}
            />
            <p className="mr-5 self-end text-caption-1 text-gray-400">10/10</p>
          </>
        ) : isAdd ? (
          <>
            <BottomModalTitle>폴더 추가</BottomModalTitle>
            <input
              className={cn('h-16 w-full bg-gray-600 outline-none', spacingStyles({ padding: 'ml' }))}
              onKeyDown={handleAddKeyDown}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <p className="mr-5 self-end text-caption-1 text-gray-400">10/10</p>
          </>
        ) : (
          <>
            <BottomModalTitle>폴더 설정</BottomModalTitle>
            {folders.map((folder, index) => {
              return (
                <BottomMenuItem
                  key={index}
                  onClick={() => console.log('asdf')}
                  update={() => handleUpdate(folder.name)}
                  delete={() => {
                    handleDelete(folder.name);
                  }}
                >
                  {folder.name}
                </BottomMenuItem>
              );
            })}
            <button className={cn('flex gap-3', spacingStyles({ padding: 'ml' }))} onClick={handleAdd}>
              <Image src="/icons/addIcon.svg" alt="추가 아이콘" width={20} height={20} />
              <p className="text-body-3 text-gray-300">추가하기</p>
            </button>
          </>
        )}
      </BottomModal>
    </main>
  );
}
