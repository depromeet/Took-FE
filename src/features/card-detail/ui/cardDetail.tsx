'use client';

import { useParams, useSearchParams } from 'next/navigation';

import LottieLoading from '@/shared/ui/lottieLoading';
import Toast from '@/shared/ui/Toast';

import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { CardDetailDto } from '../types/cardDetail';

import CardDetailHeader from './cardDetailHeader';
import CardTabs from './cardTabs';

function CardDetail() {
  const { cardId } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { data, isLoading } = useCardDetailQuery(cardId as string);

  return isLoading ? (
    <LottieLoading />
  ) : (
    <div className="w-full overflow-y-auto scrollbar-hide">
      <CardDetailHeader data={data as CardDetailDto} type={type as string} />
      <CardTabs data={data as CardDetailDto} type={type as string} />
      <Toast bottomMargin="detail" />
    </div>
  );
}

export default CardDetail;
