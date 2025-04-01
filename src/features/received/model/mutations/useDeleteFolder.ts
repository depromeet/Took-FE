import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { FOLDER_QUERY_KEY } from '../queries/useFoldersQuery';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { folderId: number }) => _deleteFolder(variables.folderId),
    onSuccess: () => {
      console.log('폴더 삭제 성공');
      toast.success('폴더가 삭제되었어요.');
      queryClient.invalidateQueries({ queryKey: [FOLDER_QUERY_KEY] });
    },
    onError: (error) => {
      console.error('폴더 삭제 실패:', error);
      toast.error('폴더 삭제에 실패했어요. 다시 시도해주세요.');
    },
  });
};
