'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

import { cn } from '../lib/utils';

const appbarVariants = cva(
  'sticky z-bar top-0 flex h-16 min-h-16 w-full max-w-[600px] items-center justify-between px-4',
  {
    variants: {
      page: {
        main: '',
        detail: '',
        create: 'bg-gray-black',
        none: '',
        mypage: 'bg-core-black',
        received: '',
      },
      hasBackground: {
        true: 'bg-gray-black',
        false: '',
      },
    },
    compoundVariants: [
      {
        page: 'detail',
        hasBackground: true,
        className: 'bg-gray-black',
      },
    ],
    defaultVariants: {
      hasBackground: false,
    },
  },
);

type AppbarVariantProps = VariantProps<typeof appbarVariants>;

type AppbarProps = AppbarVariantProps & {
  onLeftClick?: () => void;
  onRightClick?: () => void;
  onRightClickSecond?: () => void;
  title?: string;
  router?: () => void;
  isBlurred?: boolean;
  className?: string;
};

function renderLeftIcon({
  page,
  isBlurred = false,
  onLeftClick,
}: Pick<AppbarProps, 'page' | 'onLeftClick' | 'isBlurred'>) {
  switch (page) {
    case 'main':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/logo.svg" alt="로고" width={72} height={24} />
        </button>
      );
    case 'detail':
      return (
        <button
          onClick={onLeftClick}
          className={cn(
            'relative flex items-center justify-center transition-colors duration-200',
            isBlurred && 'before:absolute before:inset-[-8px] before:rounded-full before:bg-[rgba(255,255,255,0.10)]',
          )}
        >
          <Image src="/icons/leftArrow-white.svg" alt="이전 아이콘" width={24} height={24} />
        </button>
      );
    case 'none':
    case 'create':
    case 'mypage':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/leftArrow-white.svg" alt="이전 아이콘" width={24} height={24} />
        </button>
      );
    case 'received':
      return (
        <button onClick={onLeftClick}>
          <h1 className="text-title-1 text-white">받은 명함</h1>
        </button>
      );
    default:
      return null;
  }
}

function renderRightIcon({
  page,
  onRightClick,
  onRightClickSecond,
  router,
  isBlurred,
}: AppbarProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  switch (page) {
    case 'main':
      return (
        <button onClick={onRightClick}>
          <Image src="/icons/alarmIcon.svg" alt="알람 아이콘" width={24} height={24} onClick={router} />
        </button>
      );
    case 'detail':
      return (
        <button
          onClick={onRightClick}
          className={cn(
            'relative flex items-center justify-center transition-colors duration-200',
            isBlurred && 'before:absolute before:inset-[-8px] before:rounded-full before:bg-[rgba(255,255,255,0.10)]',
          )}
        >
          <Image src="/icons/menuIcon-white.svg" alt="메뉴 아이콘" width={24} height={24} />
        </button>
      );
    case 'mypage':
      if (onRightClick !== undefined) {
        return (
          <button onClick={onRightClick}>
            <Image src="/icons/menuIcon.svg" alt="메뉴 아이콘" width={24} height={24} />
          </button>
        );
      }
      break;
    case 'received':
      return (
        <div className="flex gap-4">
          {/* <button onClick={onRightClick}>
            <Image src="/icons/searchIcon.svg" alt="검색 아이콘" width={24} height={24} />
          </button> */}
          <button onClick={onRightClickSecond ?? (() => {})}>
            <Image src="/icons/menuIcon.svg" alt="메뉴 아이콘" width={24} height={24} />
          </button>
        </div>
      );
    default:
      return null;
  }
}

/** 공통 컴포넌트 - appbar
 *
 * 사용 예시 :
 * @example <Appbar page="pageName" onLeftClick={leftClickHandler} onRightClick={rightClickHandler} />
 *
 * @property {string} page - 어떤 페이지인지 나타냅니다 ('main' | 'detail' | 'create' | 'mypage' | 'received')
 * @property {boolean} hasBackground - 배경색 유무를 지정합니다
 * @property {string} title - 중앙에 표시할 제목
 * @property {function} onLeftClick - 왼쪽 버튼 클릭 시 실행할 함수
 * @property {function} onRightClick - 오른쪽 버튼 클릭 시 실행할 함수
 * @property {function} onRightClickSecond - (받은 명함) 두 번째 오른쪽 버튼 클릭 시 실행할 함수
 * @property {boolean} isBlurred - 아이콘 배경을 블러 처리할지 여부
 *
 * @returns {JSX.Element} - appbar 컴포넌트
 */

function Appbar({
  page,
  hasBackground,
  title,
  onLeftClick,
  onRightClick,
  onRightClickSecond,
  router,
  isBlurred,
  className,
}: AppbarProps) {
  return (
    <header className={cn(className, appbarVariants({ page, hasBackground }))}>
      <div className="flex flex-1">{renderLeftIcon({ page, onLeftClick, isBlurred })}</div>
      {title && <h1 className="flex-1 text-center text-body-3 text-white">{title}</h1>}
      <div className="flex flex-1 justify-end">
        {renderRightIcon({ page, onRightClick, onRightClickSecond, router, isBlurred })}
      </div>
    </header>
  );
}

export default Appbar;
