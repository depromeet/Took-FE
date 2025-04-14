'use client';

import { useParams, useSearchParams } from 'next/navigation';

import Toast from '@/shared/ui/Toast';

import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { useCardQuery } from '../hooks/query/useCardQuery';
import { CardDetailDto } from '../types/cardDetail';

import CardDetailHeader from './cardDetailHeader';
import CardTabs from './cardTabs';

function CardDetail() {
  const { cardId } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { data } = useCardDetailQuery(cardId as string);
  const { data: myData } = useCardQuery();

  return (
    <div className="w-full overflow-y-auto scrollbar-hide">
      <CardDetailHeader
        data={data as CardDetailDto}
        type={type as string}
        myCardCount={myData?.cards.length as number}
      />
      <CardTabs data={data as CardDetailDto} type={type as string} myCardCount={myData?.cards.length as number} />
      <Toast bottomMargin="detail" />
    </div>
  );
}

export default CardDetail;
