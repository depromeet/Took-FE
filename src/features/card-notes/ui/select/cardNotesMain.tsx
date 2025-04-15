'use client';

import { useRouter } from 'next/navigation';

import EmptyCard from '@/features/received/ui/emptyCard';
import LottieLoading from '@/shared/ui/lottieLoading';

import { useCardQuery } from '../../hooks/queries/useCardQuery';
import { useSelectCardStore } from '../../store/selectCardStore';

import CardNotesCard from './cardNotesCard';

function CardNotesMain() {
  const { data, isLoading } = useCardQuery();
  const { selectedCardIds, toggleCardId } = useSelectCardStore();
  const router = useRouter();

  const cardNotes = data?.cards;

  return (
    <div>
      <div className="px-[20px] pb-[24px]">
        <p className="mb-[12px] pt-[24px] text-title-1">메모를 남기고 싶은 명함을 골라보세요</p>
        <p className="text-body-3">
          <span className="mr-[2px] text-primary-normal">{selectedCardIds.length}</span>개 선택
        </p>
      </div>

      {isLoading ? (
        <LottieLoading />
      ) : (
        <div className="relative flex items-center justify-center">
          {cardNotes && cardNotes?.length > 0 ? (
            <CardNotesCard cards={cardNotes} toggleCardSelection={toggleCardId} selectedCards={selectedCardIds} />
          ) : (
            <EmptyCard />
          )}
        </div>
      )}

      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-[20px] pb-[18px] pt-[8px]">
        <button
          className={`w-full rounded-md ${selectedCardIds.length > 0 ? 'bg-primary-active' : 'bg-gray-400'} px-[32px] py-[15px] text-title-4 text-white`}
          disabled={selectedCardIds.length === 0}
          onClick={() => router.push('/card-notes/memo')}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default CardNotesMain;
