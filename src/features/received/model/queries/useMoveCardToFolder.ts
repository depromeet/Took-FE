import { useMutation } from '@tanstack/react-query';

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
      console.log('받은 명함을 폴더에 저장 성공');
    },
    onError: (error) => {
      console.error('받은 명함을 폴더에 저장 실패 :', error);
    },
  });
};
