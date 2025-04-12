import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { useBottomModal } from '@/features/card-detail/hooks/useBottomModal';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { Button } from '@/shared/ui/button';

import { useCreateFolder } from '../model/mutations/useCreateFolder';
import { useDeleteFolder } from '../model/mutations/useDeleteFolder';
import { useEditFolder } from '../model/mutations/useEditFolder';
import { useFolderStore } from '../model/store/useFoldersStore';
import { useModal } from '../model/useModal';

import FoldersList from './foldersList';
// import Intellibanner from './intellibanner';
import ReceivedCardList from './receivedCardList';
import SortModal from './sortModal';

type ReceivedCardViewProps = {
  selectedFolderId: number | null;
  setSelectedFolderId: (id: number | null) => void;
};

export default function ReceivedCardView({ selectedFolderId, setSelectedFolderId }: ReceivedCardViewProps) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 수정 버튼 누름 여부
  const [isAdd, setIsAdd] = useState<boolean>(false); // 추가하기 버튼 누름 여부

  const [folderName, setFolderName] = useState<string>(''); // 수정하려는 폴더의 기존 이름
  const [newFolderName, setNewFolderName] = useState<string>(''); // 수정하려는 폴더의 새로운 이름
  const [updatedFolderName, setUpdatedFolderName] = useState<string>(folderName); // 수정하려는 폴더의 새로운 이름

  const [sortingCriteria, setSortingCriteria] = useState<string>('최근 공유 순');

  const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();
  const { isSortingModalOpen, handleSortingModal, closeSortingModal } = useModal();
  const { folders, addFolder, updateFolder, deleteFolder } = useFolderStore();

  const { mutate: serverCreateFolder } = useCreateFolder(); // createFolder 함수와 로딩 상태
  const { mutate: serverEditFolder } = useEditFolder();
  const { mutate: serverDeleteFolder } = useDeleteFolder();

  const outside = useRef<HTMLInputElement>(null);

  const MAX_LENGTH = 10;

  const handleFolderSelect = (id?: number | null) => {
    setSelectedFolderId(id ?? null);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleUpdate = (folder: string) => {
    setFolderName(folder);
    setIsUpdate(true);
  };
  const handleDelete = (id: number) => {
    serverDeleteFolder({ folderId: id });
    deleteFolder(id);
    closeModal();
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedFolderName(e.target.value);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const handleUpdateKeyDown = (updatedFolderName: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    const index = folders.findIndex((folder) => folder.name === folderName);

    if (e?.nativeEvent.isComposing) return;
    if (e?.key == 'Enter' && updatedFolderName.length <= MAX_LENGTH) {
      e?.preventDefault();
      const folderId = folders[index].id;
      updateFolder(folderId, updatedFolderName);
      serverEditFolder({ folderId, name: updatedFolderName });
      closeModal();
    }
    if (e === undefined && updatedFolderName.length <= MAX_LENGTH) {
      const folderId = folders[index].id;
      updateFolder(folderId, updatedFolderName);
      serverEditFolder({ folderId, name: updatedFolderName });
      closeModal();
    }
  };
  const handleAddKeyDown = (newFolderName: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.nativeEvent.isComposing) return;
    if (e?.key == 'Enter' && newFolderName.length <= MAX_LENGTH) {
      e?.preventDefault();
      serverCreateFolder(newFolderName);
      addFolder(newFolderName);
      closeModal();
    }
    if (e === undefined && newFolderName.length <= MAX_LENGTH) {
      serverCreateFolder(newFolderName);
      addFolder(newFolderName);
      closeModal();
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setIsUpdate(false);
      setIsAdd(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setUpdatedFolderName(folderName);
  }, [folderName]);

  return (
    <main
      ref={outside}
      onClick={(e) => {
        if (e.target == outside.current) closeSortingModal();
      }}
    >
      {/* <Intellibanner /> */}
      <div
        className={cn('sticky top-0 z-10 flex items-center bg-gray-black pb-2', spacingStyles({ paddingTop: 'md' }))}
      >
        <button
          onClick={() => {
            headerRightHandler();
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-opacity-white-20"
        >
          <Image src="/icons/folderIcon.svg" alt="폴더 아이콘" width={18} height={18} />
        </button>
        <div className="absolute left-8 top-4 z-10 h-10 w-[10px] bg-gradient-to-r from-gray-black to-transparent"></div>
        <FoldersList selectedFolderId={selectedFolderId} handleFolderSelect={handleFolderSelect} />
      </div>
      <section className="relative" onClick={handleSortingModal}>
        <div className={cn('flex items-center justify-end gap-[2px] text-white', spacingStyles({ marginY: 'md' }))}>
          <p className="text-caption-1">{sortingCriteria}</p>
          <Image
            className="mx-1 cursor-pointer"
            src="/icons/downArrow.svg"
            alt="화살표 아이콘"
            width={12}
            height={12}
          />
        </div>
        <SortModal
          isSortingModalOpen={isSortingModalOpen}
          sortingCriteria={sortingCriteria}
          setSortingCriteria={setSortingCriteria}
        />
      </section>
      <ReceivedCardList selectedFolderId={selectedFolderId} />
      <BottomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        {isUpdate ? (
          <>
            <BottomModalTitle>폴더 이름 설정</BottomModalTitle>
            <input
              defaultValue={folderName}
              className={cn('mx-5 h-16 bg-gray-600 outline-none', spacingStyles({ padding: 'ml' }))}
              onKeyDown={(e) => handleUpdateKeyDown(updatedFolderName, e)}
              onChange={handleUpdateChange}
              autoFocus
            />
            <div className="items-top mx-5 mt-1 flex justify-between">
              <p
                className={cn(
                  '!text-caption-1 text-error-medium',
                  updatedFolderName.length <= MAX_LENGTH && 'invisible',
                )}
              >
                최대 10자까지 입력 가능해요
              </p>
              <p className="mb-3 self-end text-caption-1 text-gray-400">
                {updatedFolderName.length}/{MAX_LENGTH}
              </p>
            </div>
            <Button
              className={cn(spacingStyles({ marginX: 'ml' }))}
              onClick={() => handleUpdateKeyDown(updatedFolderName)}
            >
              다음
            </Button>
          </>
        ) : isAdd ? (
          <>
            <BottomModalTitle>폴더 추가</BottomModalTitle>
            <input
              className={cn('h-16 w-full bg-gray-600 outline-none', spacingStyles({ padding: 'ml' }))}
              onKeyDown={(e) => handleAddKeyDown(newFolderName, e)}
              onChange={handleAddChange}
              autoFocus
            />
            <div className="items-top mx-5 mt-1 flex justify-between">
              <p className={cn('!text-caption-1 text-error-medium', newFolderName.length <= MAX_LENGTH && 'invisible')}>
                최대 10자까지 입력 가능해요
              </p>
              <p className="mb-3 self-end text-caption-1 text-gray-400">
                {newFolderName.length}/{MAX_LENGTH}
              </p>
            </div>
            <Button className={cn(spacingStyles({ marginX: 'ml' }))} onClick={() => handleAddKeyDown(newFolderName)}>
              다음
            </Button>
          </>
        ) : (
          <>
            <BottomModalTitle>폴더 설정</BottomModalTitle>
            {folders.map((folder, index) => {
              return (
                <BottomMenuItem
                  key={index}
                  update={() => handleUpdate(folder.name)}
                  delete={() => {
                    handleDelete(folder.id);
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
