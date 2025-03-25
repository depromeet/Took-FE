'use client';

import { useParams } from 'next/navigation';

import SSRSafeSuspense from '@/shared/components/SSRSafeSuspense';

import CardContent from './cardContent';

function CardDetail() {
  const { cardId } = useParams();

  return (
    <SSRSafeSuspense fallback={<div>로딩중입니다...</div>}>
      <CardContent cardId={Number(cardId)} />
    </SSRSafeSuspense>
  );
}

export default CardDetail;
