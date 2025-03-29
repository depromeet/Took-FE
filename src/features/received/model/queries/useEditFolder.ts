import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const _editFolder = async (folderId: number, name: string) => {
  try {
    const response = await client.put(`${CLIENT_SIDE_URL}/api/card/folder`, {
      folderId: folderId,
      name: name,
    });
    return response;
  } catch (error) {
    console.error('폴더 수정 실패 :', error);
    throw error;
  }
};

export const useEditFolder = () => {
  return useMutation({
    mutationFn: (variables: { folderId: number; name: string }) => _editFolder(variables.folderId, variables.name),
    onSuccess: () => {
      console.log('폴더 수정 성공');
    },
    onError: (error) => {
      console.error('폴더 수정 실패:', error);
    },
  });
};
