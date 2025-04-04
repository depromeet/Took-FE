'use client';

import { useParams, useSearchParams } from 'next/navigation';

import Toast from '@/shared/ui/Toast';

import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { CardDetailDto } from '../types/cardDetail';

import CardDetailHeader from './cardDetailHeader';
import CardTabs from './cardTabs';

function CardDetail() {
  const { cardId } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { data } = useCardDetailQuery(cardId as string);

  return (
    <div className="w-full">
      <CardDetailHeader data={data as CardDetailDto} type={type as string} />
      <CardTabs data={data as CardDetailDto} />
      <Toast />
    </div>
  );
}

export default CardDetail;
