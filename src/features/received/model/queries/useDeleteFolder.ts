import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const _deleteFolder = async (folderId: number) => {
  try {
    const response = await client.delete(`${CLIENT_SIDE_URL}/api/card/folder`, { data: { folderId } });
    return response;
  } catch (error) {
    console.error('폴더 삭제 실패 :', error);
    throw error;
  }
};

export const useDeleteFolder = () => {
  return useMutation({
    // mutationFn: (folderId: number) => _deleteFolder(folderId),
    mutationFn: (variables: { folderId: number }) => _deleteFolder(variables.folderId),
    onSuccess: () => {
      console.log('폴더 삭제 성공');
    },
    onError: (error) => {
      console.error('폴더 삭제 실패:', error);
    },
  });
};
