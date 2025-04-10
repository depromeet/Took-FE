import { useDeleteFolder } from './mutations/useDeleteFolder';
import { useFolderStore } from './store/useFoldersStore';

export const useDeleteFolderModal = (closeModal: () => void) => {
  const { mutate: serverDeleteFolder } = useDeleteFolder();
  const { deleteFolder } = useFolderStore();

  const handleDelete = (id: number) => {
    serverDeleteFolder({ folderId: id });
    deleteFolder(id);
    closeModal();
  };
  return { handleDelete };
};
