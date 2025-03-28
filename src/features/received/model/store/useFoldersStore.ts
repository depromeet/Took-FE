import { create } from 'zustand';

type Folder = {
  id: number;
  name: string;
};
type FoldersStore = {
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  updateFolder: (folderName: string, newFolderName: string) => void;
  deleteFolder: (folderName: string) => void;
};

export const useFolderStore = create<FoldersStore>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  updateFolder: (folderName, newFolderName) =>
    set((state) => {
      const index = state.folders.findIndex((folder) => folder.name === folderName);
      if (index !== -1) {
        const updatedFolders = [...state.folders];
        updatedFolders[index] = { ...updatedFolders[index], name: newFolderName };
        return { folders: updatedFolders };
      }
      return state; // folderName이 없으면 상태 변경 안 함
    }),
  deleteFolder: (folderName) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.name !== folderName),
    })),
}));
