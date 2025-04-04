'use client';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { CareerFormData } from '@/features/multi-step-form/schema';
import { cn } from '@/shared/lib/utils';
import { useCardFormStore } from '@/shared/store/cardFormState';
import Tag from '@/shared/ui/tag/tag';

import { tagConfig, TagConfigItem } from '../config/config';

const MAX_DYNAMIC_TAGS = 4;

function TagBox() {
  const [tagArray, handleTagClick] = useCardFormStore(useShallow((state) => [state.tagArray, state.handleTagClick]));
  const formMethod = useFormContext<CareerFormData>();

  // 선택된 태그의 좌표 이동
  function getTagPositions(position: string, tag: TagConfigItem) {
    if (tagArray.length >= MAX_DYNAMIC_TAGS && tagArray.includes(tag.value)) {
      return tag.fixedPosition;
    }

    if (tagArray[0] === tag.value) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-64px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-64px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.value === 'hobby') return 'right-[calc(50%-28px)] bottom-[calc(50%+24px)]';
        if (tag.value === 'project') return 'right-[calc(50%-52px)] bottom-[calc(50%+24px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%+24px)]';
    }
    if (tagArray[1] === tag.value) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-108px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-108px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.value === 'hobby') return 'right-[calc(50%-28px)] bottom-[calc(50%+68px)]';
        if (tag.value === 'project') return 'right-[calc(50%-52px)] bottom-[calc(50%+68px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%+68px)]';
    }
    if (tagArray[2] === tag.value) {
      if (position.includes('top') && position.includes('left')) return 'left-[calc(50%-40px)] top-[calc(50%-20px)]';
      if (position.includes('top') && position.includes('right')) return 'right-[calc(50%-28px)] top-[calc(50%-20px)]';
      if (position.includes('bottom') && position.includes('right')) {
        if (tag.value === 'hobby') return 'right-[calc(50%-28px)] bottom-[calc(50%-20px)]';
        if (tag.value === 'project') return 'right-[calc(50%-52px)] bottom-[calc(50%-20px)]';
      }
      if (position.includes('bottom') && position.includes('left'))
        return 'left-[calc(50%-40px)] bottom-[calc(50%-20px)]';
    }
    return position;
  }

  return (
    <>
      {tagConfig.map((tag) => (
        <div key={tag.id}>
          <Tag
            message={tag.message} // 화면에 표시할 텍스트는 label 사용
            size="lg"
            className={cn(
              'transition-all duration-500 ease-in-out',
              !tagArray.includes(tag.value) && tag.animation,
              tag.className,
              tagArray.includes(tag.value) ? getTagPositions(tag.position, tag) : tag.position,
            )}
            onClick={() => handleTagClick(tag.value, formMethod)} // 클릭 시 value 전달
          />
        </div>
      ))}
    </>
  );
}
export default TagBox;
