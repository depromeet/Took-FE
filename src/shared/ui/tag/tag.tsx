'use client';

import { cva } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import { Typography } from '../typography';

type TagSize = 'sm' | 'md' | 'lg';

interface TagProps {
  message: string;
  size?: TagSize;
  onClose?: () => void;
  className?: string;
}

/** 공통 컴포넌트 - tag
 * @description Tag 컴포넌트는 다양한 크기와 옵션을 가진 태그를 렌더링합니다.
 *
 * @param {object} props - 컴포넌트 속성 객체
 * @param {string} props.message - 태그에 표시할 텍스트
 * @param {"sm" | "md" | "lg"} [props.size="md"] - 태그의 크기를 설정합니다.
 * @param {Function} [props.onClose] - 닫기 버튼 클릭 시 실행할 함수입니다. 제공된 경우에만 닫기 버튼이 표시됩니다.
 * @param {string} [props.className="bg-gray-300"] - 추가적인 클래스명입니다. 배경색을 포함한 스타일 지정에 사용됩니다.
 * @returns {JSX.Element} 렌더링된 Tag 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <Tag message="기본 태그" /> -기본 색상 bg-gray-300
 *
 * // 다양한 크기와 옵션 사용
 * <Tag message="작은 태그" size="sm" className="bg-primary-light-active" />
 * <Tag message="중간 태그" size="md" />
 * <Tag message="큰 태그" size="lg" onClose={handleCloseBtn} />
 */

function Tag({ message, size = 'md', onClose, className = 'bg-opacity-white-20' }: TagProps) {
  const tagStyles = cva('inline-flex items-center rounded-full', {
    variants: {
      size: {
        sm: 'px-2 py-0.5', // px: 8px, py: 2px
        md: 'px-3.5 py-1.5', // px: 14px, py: 6px
        lg: 'px-4 py-2', // px: 16px, py: 8px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  });

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <span className={cn(tagStyles({ size }), className)}>
      <Typography variant={size === 'lg' ? 'body-2' : size === 'md' ? 'body-3' : 'caption-1'}>{message}</Typography>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="hover:bg-gray-300/30 ml-1 flex items-center justify-center rounded-full transition-colors"
        >
          <Image src="/icon/closeBtn.svg" width={16} height={16} alt="닫기" />
        </button>
      )}
    </span>
  );
}

export default Tag;
