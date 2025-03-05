import Image from 'next/image';
import React from 'react';

type appbarPropsType = {
  page: 'main' | 'detail' | 'create';
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

function renderLeftIcon({ page, onLeftClick }: appbarPropsType & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  switch (page) {
    case 'main':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/logo.svg" alt="로고" width={72} height={24} />
        </button>
      );
    case 'detail':
    case 'create':
      return (
        <button onClick={onLeftClick}>
          <Image src="/icons/prevIcon.svg" alt="이전 아이콘" width={24} height={24} />
        </button>
      );
    default:
      return null;
  }
}

function renderRightIcon({ page, onRightClick }: appbarPropsType & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
          <Image src="/icons/menuIcon.svg" alt="메뉴 아이콘" width={24} height={24} />
        </button>
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
 *
 * @returns {JSX.Element} - appbar 컴포넌트
 */
function Appbar({ page, onLeftClick, onRightClick }: appbarPropsType) {
  return (
    <header
      className={`z-100 sticky top-0 flex h-16 w-full max-w-[600px] items-center justify-between px-4 py-5 pb-5 pr-4 ${
        page === 'create' ? 'bg-gray-black' : ''
      }`}
    >
      {renderLeftIcon({ page, onLeftClick })}
      {renderRightIcon({ page, onRightClick })}
    </header>
  );
}

export default Appbar;
