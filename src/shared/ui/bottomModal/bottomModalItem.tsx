// BottomMenuItem.tsx
import Image from 'next/image';
import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

interface BottomMenuItemProps {
  onClick?: () => void; // 메뉴 항목 전체 클릭 핸들러
  children: ReactNode;

  // 각 아이콘별 핸들러 함수 (undefined이면 아이콘 표시 안함)
  update?: (() => void) | boolean;
  delete?: (() => void) | boolean;

  className?: string;
}

export const BottomMenuItem = ({
  onClick,
  children,
  update,
  delete: deleteIcon, // delete는 예약어라 다른 이름 사용
  className,
}: BottomMenuItemProps) => {
  // 아이콘 클릭 이벤트 처리 함수
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>, handler?: (() => void) | boolean) => {
    e.stopPropagation(); // 메뉴 항목 전체 클릭 방지
    if (typeof handler === 'function') {
      handler();
    }
  };

  return (
    <div
      className={`${spacingStyles({ padding: 'ml' })} flex cursor-pointer items-center justify-between`}
      onClick={onClick}
    >
      <p className={cn('body-3 text-white', className)}>{children}</p>

      <div className="flex items-center">
        {/* 수정 아이콘 */}
        {update !== undefined && (
          <div onClick={(e) => handleIconClick(e, update)} className="mr-[20px] cursor-pointer">
            <Image src="/icons/edit.svg" alt="수정" width={20} height={20} />
          </div>
        )}

        {/* 삭제 아이콘 */}
        {deleteIcon !== undefined && (
          <div onClick={(e) => handleIconClick(e, deleteIcon)} className="cursor-pointer">
            <Image src="/icons/delete.svg" alt="삭제" width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  );
};
