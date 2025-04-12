import { MutableRefObject, useState } from 'react';

import { MAX_FOLDER_NAME_LENGTH } from '../config';

import { useEditFolder } from './mutations/useEditFolder';
import { useFolderStore } from './store/useFoldersStore';

type UseUpdateFolderProps = {
  isSubmittingRef: MutableRefObject<boolean>;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
};

export const useUpdateFolderModal = ({
  isSubmittingRef,
  folderName,
  setFolderName,
  closeModal,
}: UseUpdateFolderProps) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 수정 버튼 누름 여부
  const [updatedFolderName, setUpdatedFolderName] = useState<string>(folderName); // 수정하려는 폴더의 새로운 이름

  const { folders, updateFolder } = useFolderStore();
  const { mutate: serverEditFolder } = useEditFolder();

  const handleUpdate = (folder: string) => {
    setFolderName(folder);
    setIsUpdate(true);
  };
  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedFolderName(e.target.value);
  };

  const submitUpdateFolder = (updatedFolderName: string) => {
    if (isSubmittingRef.current) return;

    const index = folders.findIndex((folder) => folder.name === folderName);
    if (index === -1) return;

    if (updatedFolderName.length > MAX_FOLDER_NAME_LENGTH) return;

    isSubmittingRef.current = true;

    const folderId = folders[index].id;
    updateFolder(folderId, updatedFolderName);
    serverEditFolder({ folderId, name: updatedFolderName });
    closeModal();

    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 500);
  };

  const handleUpdateClick = (updatedFolderName: string) => {
    submitUpdateFolder(updatedFolderName);
  };

  const handleUpdateKeyDown = (updatedFolderName: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.nativeEvent.isComposing) return;
    if (e?.key !== 'Enter') return;

    e.preventDefault();
    submitUpdateFolder(updatedFolderName);
  };
  return {
    isUpdate,
    setIsUpdate,
    updatedFolderName,
    setUpdatedFolderName,
    handleUpdate,
    handleUpdateChange,
    handleUpdateClick,
    handleUpdateKeyDown,
  };
};
