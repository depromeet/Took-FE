import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const _deleteReceivedCards = async (cardIds: number[]) => {
  try {
    const response = await client.delete(`${CLIENT_SIDE_URL}/api/card/receive`, { data: { cardIds } });
    return response;
  } catch (error) {
    console.error('받은 명함 삭제 실패 :', error);
    throw error;
  }
};

export const useDeleteReceivedCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cardIds: number[] }) => _deleteReceivedCards(variables.cardIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      console.log('받은 명함 삭제 성공');
    },
    onError: (error) => {
      console.error('받은 명함 삭제 실패:', error);
    },
  });
};
