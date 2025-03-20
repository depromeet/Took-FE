'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import { Typography } from '../typography';

type TagSize = 'sm' | 'md' | 'lg' | 'create-input';

interface TagProps {
  message: string;
  size?: TagSize;
  onClose?: () => void;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
}

const tagStyles = cva(
  'inline-flex items-center rounded-full whitespace-nowrap absolute z-[2147483647] bg-opacity-white-20 py-[10px] pb-[10px] text-white cursor-pointer',
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-3.5 py-1.5',
        lg: 'px-4 py-2',
        'create-input': 'px-[8px] py-[3px] text-catpion-1',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const typographyVariantMapping: Record<TagSize, 'caption-1' | 'body-5'> = {
  sm: 'caption-1',
  md: 'body-5',
  lg: 'body-5',
  'create-input': 'caption-1',
};

function MotionTag({ message, size = 'md', className, onClick }: TagProps) {
  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.span
      onClick={onClick}
      className={cn(tagStyles({ size }), className)}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
    >
      <Typography variant={typographyVariantMapping[size]} className="inline-block" as="div">
        {message}
      </Typography>
    </motion.span>
  );
}

export default MotionTag;
