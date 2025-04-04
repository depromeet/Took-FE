import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import LottieLoading from '@/shared/ui/lottieLoading';
import Tag from '@/shared/ui/tag/tag';

import { useFoldersQuery } from '../model/queries/useFoldersQuery';
import { useFolderStore } from '../model/store/useFoldersStore';

type FoldersListProps = {
  selectedFolderId: number | null;
  handleFolderSelect: (id: number | null) => void;
};

export default function FoldersList({ selectedFolderId, handleFolderSelect }: FoldersListProps) {
  const tagActiveStyle = 'bg-white text-black';
  const tagDefaultStyle = 'bg-opacity-white-20 text-white';

  const { isLoading, isFetching } = useFoldersQuery();
  const { folders } = useFolderStore();

  if (isLoading || isFetching) return <LottieLoading />;
  return (
    <div
      className={cn(
        'sticky -mr-5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide',
        spacingStyles({ paddingRight: 'ml' }),
      )}
    >
      <Tag
        size="lg"
        message="전체보기"
        className={cn('cursor-pointer', selectedFolderId === null ? tagActiveStyle : tagDefaultStyle)}
        onClick={() => handleFolderSelect(null)}
      />
      {folders.map((folder, index) => {
        return (
          <Tag
            key={index}
            size="lg"
            message={folder.name}
            className={cn('cursor-pointer', selectedFolderId === folder.id ? tagActiveStyle : tagDefaultStyle)}
            onClick={() => handleFolderSelect(folder.id)}
          />
        );
      })}
    </div>
  );
}
