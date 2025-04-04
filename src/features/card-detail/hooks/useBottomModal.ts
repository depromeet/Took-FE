'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';

export const useBottomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useIsLoggedIn();

  // 헤더 메뉴 클릭시 함수
  const headerRightHandler = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      toast.error('로그인을 먼저 진행해주세요');
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, setIsModalOpen, headerRightHandler, closeModal };
};
