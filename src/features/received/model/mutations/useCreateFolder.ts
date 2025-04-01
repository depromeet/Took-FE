import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { FOLDER_QUERY_KEY } from '../queries/useFoldersQuery';

const _createFolder = async (folderName: string) => {
  try {
    const response = await client.post(`${CLIENT_SIDE_URL}/api/card/folder`, {
      name: folderName,
    });
    return response;
  } catch (error) {
    console.error('폴더 생성 실패 :', error);
    throw error;
  }
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderName: string) => _createFolder(folderName),
    onSuccess: () => {
      console.log('폴더 생성 성공');
      queryClient.invalidateQueries({ queryKey: [FOLDER_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('폴더 생성 실패:', error);
    },
  });
};
