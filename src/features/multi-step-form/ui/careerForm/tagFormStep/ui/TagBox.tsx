'use client';
import React, { Dispatch } from 'react';

import { cn } from '@/shared/lib/utils';
import Tag from '@/shared/ui/tag/tag';

import { tagConfig, TagConfigItem } from '../config/config';

type TagBoxPropsType = {
  tagCount: number;
  tagArray: string[];
  setTagCount: Dispatch<React.SetStateAction<number>>;
  setTagArray: Dispatch<React.SetStateAction<string[]>>;
};

const MAX_DYNAMIC_TAGS = 4;

/**
 * TagBox : 태그 박스
 *
 */
function TagBox({ tagCount, tagArray, setTagCount, setTagArray }: TagBoxPropsType) {
  function handleTagClick(tagMessage: string) {
    if (!tagArray.includes(tagMessage)) {
      setTagCount(tagCount + 1);
      setTagArray((prev) => [...prev, tagMessage]);
    } else {
      setTagCount(tagCount - 1);
      setTagArray(tagArray.filter((selectedMessage) => selectedMessage !== tagMessage));
    }
  }

  // 선택된 태그의 좌표 이동
  function getTagPositions(position: string, tag: TagConfigItem) {
    if (tagArray.length >= MAX_DYNAMIC_TAGS && tagArray.includes(tag.message)) {
      return tag.fixedPosition;
    }

    if (tagArray[0] === tag.message) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-56px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-56px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.message === '취미') return 'right-[calc(50%-28px)] bottom-[calc(50%+16px)]';
        if (tag.message === '대표 프로젝트') return 'right-[calc(50%-52px)] bottom-[calc(50%+16px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%+16px)]';
    }
    if (tagArray[1] === tag.message) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-104px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-104px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.message === '취미') return 'right-[calc(50%-28px)] bottom-[calc(50%+60px)]';
        if (tag.message === '대표 프로젝트') return 'right-[calc(50%-52px)] bottom-[calc(50%+60px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%+60px)]';
    }
    if (tagArray[2] === tag.message) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-12px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-12px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.message === '취미') return 'right-[calc(50%-28px)] bottom-[calc(50%-32px)]';
        if (tag.message === '대표 프로젝트') return 'right-[calc(50%-52px)] bottom-[calc(50%-32px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%-32px)]';
    }
  }

  return (
    <>
      {tagConfig.map((tag) => {
        return (
          <div key={tag.id}>
            <Tag
              message={tag.message}
              size="lg"
              className={cn(
                'transition-all duration-500 ease-in-out',
                !tagArray.includes(tag.message) && tag.animation,
                tag.className,
                tagArray.includes(tag.message) ? getTagPositions(tag.position, tag) : tag.position,
              )}
              onClick={() => handleTagClick(tag.message)}
            />
          </div>
        );
      })}
    </>
  );
}
export default TagBox;
