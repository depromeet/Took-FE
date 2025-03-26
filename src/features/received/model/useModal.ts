import { useState } from 'react';

export function useModal() {
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const openChooseModal = () => {
    setIsChooseModalOpen(true);
  };
  const openSettingModal = () => {
    setIsSettingModalOpen(true);
  };
  const closeChooseModal = () => {
    setIsChooseModalOpen(false);
  };
  const closeSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  return {
    isChooseModalOpen,
    isSettingModalOpen,
    openChooseModal,
    openSettingModal,
    closeChooseModal,
    closeSettingModal,
  };
}
