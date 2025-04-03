import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const _moveCardToFolder = async (folderId: number, cardIds: number[]) => {
  try {
    const response = await client.put(`${CLIENT_SIDE_URL}/api/card/receive/folder`, {
      folderId: folderId,
      cardIds: cardIds,
    });
    return response;
  } catch (error) {
    console.error('받은 명함을 폴더에 저장 실패 :', error);
    throw error;
  }
};

export const useMoveCardToFolder = () => {
  return useMutation({
    mutationFn: (variables: { folderId: number; cardIds: number[] }) =>
      _moveCardToFolder(variables.folderId, variables.cardIds),
    onSuccess: () => {
      toast.success('폴더 설정이 완료되었어요');
    },
    onError: (error) => {
      console.error('받은 명함을 폴더에 저장 실패 :', error);
      toast.error('폴더 설정이 실패했어요. 다시 시도해주세요.');
    },
  });
};
