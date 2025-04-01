import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { CARD_QUERY_KEY } from '../queries/useReceivedCardsQuery';

const _deleteReceivedCards = async (cardIds: number[]) => {
  try {
    const response = await client.delete(`${CLIENT_SIDE_URL}/api/card/receive`, { data: { cardIds } });
    return response;
  } catch (error) {
    console.error('받은 명함 삭제 실패 :', error);
    throw error;
  }
};

export const useDeleteReceivedCards = (folderId?: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cardIds: number[] }) => _deleteReceivedCards(variables.cardIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARD_QUERY_KEY, folderId] });
      console.log('받은 명함 삭제 성공');
      toast.success('명함을 삭제했어요');
    },
    onError: (error) => {
      console.error('받은 명함 삭제 실패:', error);
      toast.error('삭제에 실패했어요. 다시 시도해주세요.');
    },
  });
};
