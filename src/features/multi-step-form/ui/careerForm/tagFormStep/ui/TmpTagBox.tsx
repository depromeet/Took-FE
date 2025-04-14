'use client';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { CareerFormData } from '@/features/multi-step-form/schema';
import { cn } from '@/shared/lib/utils';
import { useCardFormStore } from '@/shared/store/cardFormState';
import MotionTag from '@/shared/ui/tag/motionTag';

import { tagConfig, TagConfigItem } from '../config/config';

const MAX_DYNAMIC_TAGS = 4;

function TagBox() {
  const [tagArray, handleTagClick] = useCardFormStore(useShallow((state) => [state.tagArray, state.handleTagClick]));
  const formMethod = useFormContext<CareerFormData>();

  const getVariants = {
    unselected: (tag: TagConfigItem) => ({
      x: tag.initialPosition.x,
      y: tag.initialPosition.y,
      transition: { duration: 0.5 },
    }),
    selected: (tag: TagConfigItem & { index: number }) => {
      if (tagArray.length >= MAX_DYNAMIC_TAGS) {
        return {
          x: tag.fixedEndPosition.x,
          y: tag.fixedEndPosition.y,
          transition: { duration: 0.5 },
        };
      }
      // 인덱스에 따라 다른 endPosition 사용
      const positions = [tag.firstEndPosition, tag.secondEndPosition, tag.thirdEndPosition]; // 필요에 따라 확장
      const pos = positions[tag.index] || tag.firstEndPosition; // 디폴트는 first

      return {
        x: pos.x,
        y: pos.y,
        transition: { duration: 0.5 },
      };
    },
  };

  return (
    <div className="h-full w-full">
      {tagConfig.map((tag) => {
        const isSelected = tagArray.includes(tag.value);
        const index = tagArray.indexOf(tag.value);

        return (
          <motion.div
            key={tag.id}
            custom={{ ...tag, index }}
            variants={getVariants}
            initial="unselected"
            animate={isSelected ? 'selected' : 'unselected'}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
            }}
            className="absolute left-1/2 top-1/2 z-tag -translate-x-1/2 -translate-y-1/2 transform"
            whileTap="tap"
          >
            <MotionTag
              message={tag.message}
              size="lg"
              className={cn('transition-all duration-500 ease-in-out', tag.className, !isSelected && tag.animation)}
              onClick={() => handleTagClick(tag.value, formMethod)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default TagBox;
