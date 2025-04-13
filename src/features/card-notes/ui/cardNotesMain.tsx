'use client';

import { useCardQuery } from '../hooks/queries/useCardQuery';

import CardNotesCard from './cardNotesCard';

function CardNotesMain() {
  const { data } = useCardQuery();

  return (
    <div>
      <div className="px-[20px] pb-[24px]">
        <p className="mb-[12px] pt-[24px] text-title-1">기록을 남기고 싶은 명함을 골라보세요</p>
        <p className="text-body-3">
          <span className="mr-[2px] text-primary-normal">0</span>개 선택
        </p>
      </div>

      <div className="flex items-center justify-center">
        {data?.cards && data.cards.length > 0 ? (
          <CardNotesCard cards={data.cards} />
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-gray-medium">명함이 없습니다</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-[20px] pb-[18px] pt-[8px]">
        <button className="w-full rounded-md bg-primary-active px-[32px] py-[15px] text-title-4">다음</button>
      </div>
    </div>
  );
}

export default CardNotesMain;
