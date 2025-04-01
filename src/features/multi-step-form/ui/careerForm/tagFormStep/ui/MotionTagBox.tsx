'use client';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { CareerFormData } from '@/features/multi-step-form/schema';
import { cn } from '@/shared/lib/utils';
import { useCardFormStore } from '@/shared/store/cardFormState';
import MotionTag from '@/shared/ui/tag/motionTag';

import { tagConfig, TagConfigItem } from '../config/config';

function MotionTagBox() {
  const formMethod = useFormContext<CareerFormData>();
  const [tagArray, handleTagClick] = useCardFormStore(useShallow((state) => [state.tagArray, state.handleTagClick]));

  // unselected: 태그가 부모 중앙에서 초기 오프셋(tag.initialPosition)만큼 떨어져 있다.
  const variants = {
    unselected: (tag: TagConfigItem) => ({
      x: tag.initialPosition.x,
      y: tag.initialPosition.y,
      transition: { duration: 0.5 },
    }),
    selected: (tag: TagConfigItem) => ({
      x: tag.endPosition.x,
      y: tag.endPosition.y,
      transition: { duration: 0.5 },
    }),
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      {tagConfig.map((tag) => {
        const isSelected = tagArray.includes(tag.value);
        return (
          <motion.div
            key={tag.id}
            custom={tag}
            variants={variants}
            initial="unselected"
            animate={isSelected ? 'selected' : 'unselected'}
            whileTap="tap"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <MotionTag
              message={tag.message}
              size="lg"
              className={cn('transition-all duration-500 ease-in-out', tag.className)}
              onClick={() => handleTagClick(tag.value, formMethod)}
            />
          </motion.div>
        );
      })}
    </>
  );
}

export default MotionTagBox;
