'use client';

// 사용 예시

{
  /* <div className="flex items-center gap-3">
    <Tag message="Small 태그" size="sm" hasCloseButton={true} backgroundColor="bg-primary-hover" />
    <Tag message="Small 태그" size="md" hasCloseButton={false} />
    <Tag message="Small 태그" size="lg" hasCloseButton={true} />
</div> */
}

import Image from 'next/image';
import React from 'react';

import closeBtn from '../icon/closeBtn.svg';
import { Typography } from '../typography';

type TagSize = 'sm' | 'md' | 'lg';

interface TagProps {
  message: string;
  backgroundColor?: string;
  hasCloseButton?: boolean;
  size?: TagSize;
  onClose?: () => void;
  className?: string;
}

/**
 * 현재 디자인 토큰에 opc 색상이 없습니다.
 * 임시로 bg-gray-300를 디폴트 색상으로 지정 -> 이후 opc/white-20으로 수정 예정
 */

function Tag({
  message,
  backgroundColor = 'bg-gray-600',
  hasCloseButton = false,
  size = 'md',
  onClose,
  className = '',
}: TagProps) {
  const sizeClasses = {
    lg: 'px-4 py-2', // px: 16px, py: 8px
    md: 'px-3.5 py-1.5', // px: 14px, py: 6px
    sm: 'px-2 py-0.5', // px: 8px, py: 2px
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full ${backgroundColor} ${sizeClasses[size]} ${className}`}>
      {/* Typography 추가 이후 폰트 크기를 수정할 예정입니다. */}
      <Typography variant={size === 'lg' ? 'body-2' : size === 'md' ? 'body-3' : 'caption-1'}>{message}</Typography>
      {hasCloseButton && (
        <button
          type="button"
          onClick={handleClose}
          className="hover:bg-gray-300/30 flex items-center justify-center rounded-full transition-colors"
        >
          <Image src={closeBtn} alt="closeBtn" className="h-4 w-4" />
        </button>
      )}
    </span>
  );
}

export default Tag;
