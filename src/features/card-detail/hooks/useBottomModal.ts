'use client';

import { useState } from 'react';

export const useBottomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 헤더 메뉴 클릭시 함수
  const headerRightHandler = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, setIsModalOpen, headerRightHandler, closeModal };
};
