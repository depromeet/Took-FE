'use client';

import { cva } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

import closeBtn from '../icon/closeBtn.svg';
import { Typography } from '../typography';

/** 공통 컴포넌트 - tag
 * Tag 컴포넌트는 다양한 크기와 옵션을 가진 태그를 렌더링합니다.
 *
 * @param {object} props - 컴포넌트 속성 객체
 * @param {string} props.message - 태그에 표시할 텍스트
 * @param {"sm" | "md" | "lg"} [props.size="md"] - 태그의 크기를 설정합니다.
 * @param {boolean} [props.hasCloseButton=false] - 닫기 버튼 표시 여부를 결정합니다.
 * @param {string} [props.backgroundColor="bg-gray-600"] - 배경 색상을 설정합니다.
 * @param {Function} [props.onClose] - 닫기 버튼 클릭 시 실행할 함수입니다.
 * @param {string} [props.className] - 추가적인 클래스명입니다.
 * @returns {JSX.Element} 렌더링된 Tag 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <Tag message="기본 태그" />
 *
 * // 다양한 크기와 옵션 사용
 * <Tag message="작은 태그" size="sm" hasCloseButton={true} backgroundColor="bg-primary-hover" />
 * <Tag message="중간 태그" size="md" hasCloseButton={false} />
 * <Tag message="큰 태그" size="lg" hasCloseButton={true} />
 */

type TagSize = 'sm' | 'md' | 'lg';

interface TagProps {
  message: string;
  backgroundColor?: string;
  hasCloseButton?: boolean;
  size?: TagSize;
  onClose?: () => void;
  className?: string;
}

function Tag({
  message,
  backgroundColor = 'bg-gray-600',
  hasCloseButton = false,
  size = 'md',
  onClose,
  className = '',
}: TagProps) {
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
    <span className={`${tagStyles({ size })} ${backgroundColor} ${className}`}>
      <Typography variant={size === 'lg' ? 'body-2' : size === 'md' ? 'body-3' : 'caption-1'}>{message}</Typography>
      {hasCloseButton && (
        <button
          type="button"
          onClick={handleClose}
          className="hover:bg-gray-300/30 ml-1 flex items-center justify-center rounded-full transition-colors"
        >
          <Image src={closeBtn} alt="closeBtn" className="h-4 w-4" />
        </button>
      )}
    </span>
  );
}

export default Tag;
