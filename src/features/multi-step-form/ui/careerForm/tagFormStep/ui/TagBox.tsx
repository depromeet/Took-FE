'use client';
import React, { Dispatch, useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
import Tag from '@/shared/ui/tag/tag';

import { tagConfig } from '../config/config';

type TagBoxPropsType = {
  tagCount: number;
  tagArray: string[];
  setTagCount: Dispatch<React.SetStateAction<number>>;
  setTagArray: Dispatch<React.SetStateAction<string[]>>;
};

/**
 * TagBox : 태그 박스
 *
 */
function TagBox({ tagCount, tagArray, setTagCount, setTagArray }: TagBoxPropsType) {
  useEffect(() => {
    console.log(tagCount);
    console.log(tagArray);
  }, [tagCount]);

  function handleTagClick(tagMessage: string) {
    if (!tagArray.includes(tagMessage)) {
      setTagCount(tagCount + 1);
      setTagArray((prev) => [...prev, tagMessage]);
    } else {
      setTagCount(tagCount - 1);
      setTagArray(tagArray.filter((selectedMessage) => selectedMessage !== tagMessage));
    }
  }

  // className: `left-1/2 -translate-x-1/2 top-40
  return (
    <>
      {tagConfig.map((tag) => {
        return (
          <div key={tag.id} className={cn()} onClick={() => handleTagClick(tag.message)}>
            <Tag
              message={tag.message}
              size="lg"
              className={cn(
                'transition-all duration-500 ease-in-out',
                !tagArray.includes(tag.message) && 'upanddown',
                tag.className,
                tag.position,
                tagArray[0] === tag.message ? 'move-to-one' : tag.position,
                tagArray[1] === tag.message ? 'move-to-two' : tag.position,
                tagArray[2] === tag.message ? 'move-to-three' : tag.position,
              )}
            />
          </div>
        );
      })}
    </>
  );
}
export default TagBox;
