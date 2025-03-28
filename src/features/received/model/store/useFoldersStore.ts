import { create } from 'zustand';

type Folder = {
  id: number;
  name: string;
};
type FoldersStore = {
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  addFolder: (folderName: string) => void;
  updateFolder: (folderName: string, newFolderName: string) => void;
  deleteFolder: (folderName: string) => void;
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
  updateFolder: (folderName, newFolderName) =>
    set((state) => {
      const index = state.folders.findIndex((folder) => folder.name === folderName);
      if (index !== -1) {
        const updatedFolders = [...state.folders];
        updatedFolders[index] = { ...updatedFolders[index], name: newFolderName };
        return { folders: updatedFolders };
      }
      return state;
    }),
  deleteFolder: (folderName) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.name !== folderName),
    })),
}));
