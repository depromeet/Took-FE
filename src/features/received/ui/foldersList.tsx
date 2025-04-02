import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Tag from '@/shared/ui/tag/tag';

import { useFoldersQuery } from '../model/queries/useFoldersQuery';
import { useFolderStore } from '../model/store/useFoldersStore';

type FoldersListProps = {
  handleFolderSelect: (id: number | null) => void;
};

export default function FoldersList({ handleFolderSelect }: FoldersListProps) {
  const tagStyle = 'bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer';

  const { isLoading, isFetching } = useFoldersQuery();
  const { folders } = useFolderStore();

  if (isLoading || isFetching) return <p>폴더 로딩중이에요...</p>; // 임시 로딩 구현
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
        className="cursor-pointer bg-white text-black"
        onClick={() => handleFolderSelect(null)}
      />
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
  );
}
