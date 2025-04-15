'use client';

import { useRouter } from 'next/navigation';

import { useInterestCardsQuery } from '@/features/received/model/queries/useInterestCardsQuery';
import EmptyCard from '@/features/received/ui/emptyCard';
import ReceivedCard from '@/features/received/ui/receivedCard';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import LottieLoading from '@/shared/ui/lottieLoading';
import { Navbar } from '@/shared/ui/Navigation';

function Page() {
  const handleBack = useHistoryBack();
  const router = useRouter();

  const { data, isLoading } = useInterestCardsQuery();

  const cardData = data?.cards;

  function handleRouting(cardId: number) {
    router.push(`/card-detail/${cardId}?type=receivedcard`);
  }

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="interest" title="흥미로운 명함" onLeftClick={handleBack} hasBackground={false} />
        {isLoading ? (
          <LottieLoading />
        ) : (
          <div className="mt-[16px] flex flex-col gap-4 overflow-y-auto px-5 pb-24 scrollbar-hide">
            {cardData && cardData?.length > 0 ? (
              cardData?.map((value) => (
                <ReceivedCard
                  key={value.id}
                  cardData={value}
                  onClick={() => {
                    handleRouting(value.id);
                  }}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </div>
        )}

        <Navbar />
      </div>
    </div>
  );
}

export default Page;
