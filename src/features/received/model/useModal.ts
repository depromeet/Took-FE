import { useState } from 'react';

export function useModal() {
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);

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
  const closeSortingModal = () => {
    setIsSortingModalOpen(false);
  };
  const handleSortingModal = () => {
    setIsSortingModalOpen(!isSortingModalOpen);
  };

  return {
    isChooseModalOpen,
    isSettingModalOpen,
    isSortingModalOpen,
    openChooseModal,
    openSettingModal,
    closeChooseModal,
    closeSettingModal,
    closeSortingModal,
    handleSortingModal,
  };
}
