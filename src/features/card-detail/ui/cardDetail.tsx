'use client';

import { useParams } from 'next/navigation';

import SSRSafeSuspense from '@/shared/components/SSRSafeSuspense';

import CardContent from './cardContent';

function CardDetail() {
  const { cardId } = useParams();

  return (
    /**
     * 기존 suspense를 사용하면 fallback이 적용 불가
     * suspense를 사용할려면 useSuspenseQuery를 사용해야된다.
     * 현재는 useQuery로 작동하는중
     * 이유는 에러 페이지 이동을 막기 위해  throwOnError: false,를 적용시키 위해서
     * 추후 errorboundary를 사용한다면 useSuspenseQuery를 사용해서 throwOnError가 작동하게 해야된다.
     */

    <SSRSafeSuspense fallback={<div className="justify-cente flex h-dvh items-center">로딩중입니다...</div>}>
      <CardContent cardId={cardId as string} />
    </SSRSafeSuspense>
  );
}

export default CardDetail;
