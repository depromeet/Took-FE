'use client';

import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { CardDetailDto } from '../types/cardDetail';

import CardDetailHeader from './cardDetailHeader';
import CardTabs from './cardTabs';

// 별도 컴포넌트로 분리
interface CardContentProps {
  cardId: string;
  type: string;
}
function CardContent({ cardId, type }: CardContentProps) {
  const { data } = useCardDetailQuery(cardId);

  return (
    <>
      <CardDetailHeader data={data as CardDetailDto} type={type} />
      <CardTabs data={data as CardDetailDto} />
    </>
  );
}

export default CardContent;
