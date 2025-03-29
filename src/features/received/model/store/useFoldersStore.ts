import { create } from 'zustand';

import { Folder } from '@/entities/folder/types';

type FoldersStore = {
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  addFolder: (folderName: string) => void;
  updateFolder: (id: number, newFolderName: string) => void;
  deleteFolder: (id: number) => void;
};

export const useFolderStore = create<FoldersStore>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  addFolder: (folderName) =>
    set((state) => {
      const lastId = state.folders.length > 0 ? state.folders[state.folders.length - 1].id : 0;
      return {
        folders: [...state.folders, { id: lastId + 1, name: folderName }],
      };
    }),
  updateFolder: (id, newFolderName) =>
    set((state) => {
      const index = state.folders.findIndex((folder) => folder.id === id);
      if (index !== -1) {
        const updatedFolders = [...state.folders];
        updatedFolders[index] = { ...updatedFolders[index], name: newFolderName };
        return { folders: updatedFolders };
      }
      return state;
    }),
  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
    })),
}));
