'use client';

import { useRef } from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '.';

type WrappedDialogProps = {
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  footer: React.ReactNode | ((close: () => void) => React.ReactNode);
  className?: string;
  onClose?: () => void;
};

/**
 * @property {string} title - 다이얼로그의 제목
 * @property {React.ReactNode} children - 다이얼로그의 본문 컨텐츠
 * @property {React.ReactNode} trigger - 다이얼로그를 열기 위한 트리거 요소
 * @property {React.ReactNode | ((close: () => void) => React.ReactNode)} footer - 다이얼로그 하단의 푸터 영역. 함수 또는 ReactNode를 받을 수 있음
 * @property {string} [className] - 추가적인 스타일링을 위한 클래스명
 * @property {() => void} [onClose] - 다이얼로그가 닫힐 때 실행될 콜백 함수
 */

export const WrappedDialog = ({ title, children, trigger, footer, className, onClose }: WrappedDialogProps) => {
  // 다이얼로그 닫기 버튼을 참조하기 위한 ref
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    closeButtonRef.current?.click();
    onClose?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn('w-[320px] bg-gray-600', className)}>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-title-3 text-gray-white">{title}</DialogTitle>
        </DialogHeader>
        <div
          className={cn('flex items-center justify-center', spacingStyles({ paddingTop: 'ms', paddingBottom: 'lx' }))}
        >
          {children}
        </div>
        <DialogFooter>{typeof footer === 'function' ? footer(handleClose) : footer}</DialogFooter>
        <DialogClose ref={closeButtonRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

/**
 * @example
 * 1. 함수형 푸터 사용하기
 *
 * <WrappedDialog
 *  title="다이얼로그 제목"
 *  trigger={<Button>다이얼로그 열기</Button>}
 *  footer={(close) => <Button onClick={close}>확인</Button>}
 * />
 *
 * 2. 비동기 작업 처리하기
 *
 * <WrappedDialog
 *  title="다이얼로그 제목"
 *  trigger={<Button>다이얼로그 열기</Button>}
 *  footer={async (close) => {
 *    await asyncOperation();
 *    close();
 *  }}
 * />
 *
 * 3. 다이얼로그 닫기 콜백 처리하기
 *
 * <WrappedDialog
 *  title="다이얼로그 제목"
 *  trigger={<Button>다이얼로그 열기</Button>}
 *  footer={(close) => <Button onClick={close}>확인</Button>}
 *  onClose={() => {
 *    console.log('다이얼로그가 닫혔습니다.');
 *  }}
 * />
 *
 * 4. 다이얼로그 닫기 콜백 처리하기
 *
 * <WrappedDialog
 *  title="다이얼로그 제목"
 *  trigger={<Button>다이얼로그 열기</Button>}
 *  footer={(close) => <Button onClick={close}>확인</Button>}
 *  onClose={() => {
 *    console.log('다이얼로그가 닫혔습니다.');
 *  }}
 * />
 */
