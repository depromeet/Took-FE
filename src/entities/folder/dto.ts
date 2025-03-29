import { Folder } from './types';

export type FolderDto = {
  status: string;
  message: string;
  timestamp: string;
  data: {
    folders: Folder[];
  };
};
