'use client';

import Image from 'next/image';
import React from 'react';

type appbarPropsType = {
  page: 'main' | 'detail' | 'create' | 'mypage' | 'received';
  onLeftClick?: () => void;
  onRightClick?: () => void; // 기존 방식 유지
  onRightClickSecond?: () => void;
  hasBackground?: boolean;
  title?: string;
};

function renderLeftIcon({ page, onLeftClick }: Pick<appbarPropsType, 'page' | 'onLeftClick'>) {
  switch (page) {
    case 'main':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/logo.svg" alt="로고" width={72} height={24} />
        </button>
      );
    case 'detail':
    case 'create':
    case 'mypage':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/leftArrow-white.svg" alt="이전 아이콘" width={24} height={24} />
        </button>
      );
    case 'received':
      return <h1 className="text-title-1 text-white">받은 명함</h1>;
    default:
      return null;
  }
}

function renderRightIcon({
  page,
  onRightClick,
  onRightClickSecond,
}: appbarPropsType & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  switch (page) {
    case 'main':
      return (
        <button onClick={onRightClick}>
          <Image src="/icons/alarmIcon.svg" alt="알람 아이콘" width={24} height={24} />
        </button>
      );
    case 'detail':
      return (
        <button onClick={onRightClick}>
          <Image src="/icons/menuIcon-white.svg" alt="메뉴 아이콘" width={24} height={24} />
        </button>
      );
    case 'received':
      return (
        <div className="flex gap-4">
          <button onClick={onRightClick}>
            <Image src="/icons/searchIcon.svg" alt="검색 아이콘" width={24} height={24} />
          </button>
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
 * @param {string} page - 어떤 페이지인지 나타냅니다 ('main' | 'detail' | 'create')
 * @param {function} onLeftClick - 왼쪽 버튼 클릭 시 실행할 함수
 * @param {function} onRightClick - 오른쪽 버튼 클릭 시 실행할 함수
 * @param {function} onRightClickSecond - (받은 명함) 두 번째 오른쪽 버튼 클릭 시 실행할 함수
 *
 * @returns {JSX.Element} - appbar 컴포넌트
 */
function Appbar({ page, hasBackground, title, onLeftClick, onRightClick, onRightClickSecond }: appbarPropsType) {
  return (
    <header
      className={`z-100 sticky top-0 flex h-16 min-h-16 w-full max-w-[600px] items-center justify-between px-4 ${
        page === 'detail' && hasBackground ? 'bg-gray-black' : page === 'create' ? 'bg-gray-black' : ''
      }`}
    >
      <div className="flex flex-1">{renderLeftIcon({ page, onLeftClick })}</div>

      {title && <h1 className="flex-1 text-center text-body-3">{title}</h1>}

      <div className="flex flex-1 justify-end">{renderRightIcon({ page, onRightClick, onRightClickSecond })}</div>
    </header>
  );
}

export default Appbar;
