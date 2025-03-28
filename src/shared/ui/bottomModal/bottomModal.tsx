// BottomModal.tsx
'use client';

import { motion, AnimatePresence, PanInfo, useMotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

interface BottomModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  mode?: boolean;
  children: ReactNode;
}

/**
 * 바텀 시트 형태의 모달 컴포넌트
 *
 * @param {Object} props - 컴포넌트 프로퍼티
 * @param {boolean} props.isModalOpen - 모달 표시 여부
 * @param {function} props.closeModal - 모달 닫기 함수
 * @param {ReactNode} props.children - 모달 내부에 표시할 콘텐츠
 *
 * @example
 * // 기본 사용법
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const closeModal = () => setIsModalOpen(false);
 *
 * return (
 *   <BottomModal isModalOpen={isModalOpen} closeModal={closeModal}>
 *     <BottomMenuItem>메뉴 항목</BottomMenuItem>
 *   </BottomModal>
 * );
 *
 * @example
 * // useBottomModal 훅 사용하기
 * const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();
 *
 * return (
 *     <BottomModal isModalOpen={isModalOpen} closeModal={closeModal}>
 *       <BottomModalTitle>폴더 설정</BottomModalTitle>
 *       // 수정 , 삭제가 svg가 필요 없는 경우 -> onClick만 사용
 *       // 필요한 경우 update , delete 사용 -> onClick은 선택적 사용
 *       <BottomMenuItem onClick={handleMode} update={()=>{}} delete={()=>{}}>디프만</BottomMenuItem>
 *       <BottomMenuItem>엘리스랩</BottomMenuItem>
 *     </BottomModal>
 * );
 *
 * @returns 드래그 가능한 바텀 모달 컴포넌트
 */

export const BottomModal = ({ isModalOpen, closeModal, mode, children }: BottomModalProps) => {
  const y = useMotionValue(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // 드래그 종료 처리
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const yOffset = info.offset.y;
    const velocity = info.velocity.y;

    // 아래로 충분히 드래그했거나 빠르게 드래그했을 때
    if (yOffset > 50 || velocity > 300) {
      closeModal();
    } else {
      // 충분히 드래그하지 않았으면 원래 위치로
      y.set(0);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* 기본 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="z-modalBackground absolute inset-0 bg-black"
            onClick={closeModal}
          />

          {/* 바텀 모달 */}
          <motion.div
            ref={modalRef}
            initial={{ y: '20%' }}
            animate={{
              y: 0,
            }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ y }}
            className={cn(
              'z-bottomSheet fixed bottom-0 left-0 right-0 mx-auto max-w-[600px] rounded-t-2xl bg-gray-600',
              mode ? 'z-bottomSheet' : 'z-bottomSheet',
            )}
          >
            <div className={`relative flex w-full flex-col ${spacingStyles({ paddingBottom: 'xl' })}`}>
              <div
                className={`h-[6px] w-[60px] self-center rounded-full bg-gray-800 ${spacingStyles({ marginTop: 'ms', marginBottom: 'ms' })}`}
              />

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
