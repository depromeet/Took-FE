import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
      toast.success('폴더가 추가되었어요.');

      queryClient.invalidateQueries({ queryKey: [FOLDER_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('폴더 생성 실패:', error);
      toast.error('폴더 생성에 실패했어요. 다시 시도해주세요.');
    },
  });
};
