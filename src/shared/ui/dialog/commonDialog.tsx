import { Button } from '../button';

import { WrappedDialog } from './wrappedDialog';

import { DialogClose } from '.';

type CommonDialogProps = {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  onConfirm: () => void;
  actionText: string;
  cancelText: string;
};

/**
 * 공통으로 사용되는 다이얼로그 컴포넌트
 * 제목, 내용, 확인/취소 버튼을 포함하는 기본적인 다이얼로그 구조를 제공합니다.
 */

/**
 * 공통 다이얼로그 컴포넌트의 Props 타입
 * @property {string} title - 다이얼로그 제목
 * @property {React.ReactNode} trigger - 다이얼로그를 열기 위한 트리거 요소
 * @property {React.ReactNode} children - 다이얼로그 내부 컨텐츠
 * @property {() => void} onConfirm - 확인 버튼 클릭 시 실행될 콜백 함수
 * @property {string} actionText - 확인 버튼에 표시될 텍스트 (기본값: '확인')
 * @property {string} cancelText - 취소 버튼에 표시될 텍스트 (기본값: '취소')
 */

const CommonDialog = ({
  title,
  trigger,
  children,
  onConfirm,
  actionText = '확인',
  cancelText = '취소',
}: CommonDialogProps) => {
  return (
    <WrappedDialog
      title={title}
      trigger={trigger}
      footer={
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="weak" size="dialog">
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button size="dialog" onClick={onConfirm}>
              {actionText}
            </Button>
          </DialogClose>
        </div>
      }
    >
      {children}
    </WrappedDialog>
  );
};

export default CommonDialog;
