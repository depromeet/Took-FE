import React, { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { ReceivedCheckbox } from '@/shared/ui/Checkbox/receivedCheckbox';

import { useReceivedCardQuery } from '../model/queries/useReceivedCardQuery';

import ReceivedCard from './receivedCard';

type ChooseReceivedCardProps = {
  openModal: () => void;
};

export default function ChooseReceivedCardView({ openModal }: ChooseReceivedCardProps) {
  const { data = [] } = useReceivedCardQuery();
  const [checked, setChecked] = useState<boolean[]>([]);
  const isAnyChecked = checked.some((value) => value);

  useEffect(() => {
    setChecked(new Array(data.length).fill(false));
    console.log(checked);
  }, [data]);

  const toggleChecked = (index: number) => {
    setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  const handleDelete = () => {
    const filteredData = data.filter((_, index) => !checked[index]);
    console.log('삭제 후 남은 데이터:', filteredData);
    // 실제 삭제 API
    setChecked(new Array(filteredData.length).fill(false));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-3 text-body-4 font-bold">
        <button
          className={cn('text-white', { 'font-normal text-gray-400': !isAnyChecked })}
          onClick={openModal}
          disabled={!isAnyChecked}
        >
          폴더 설정
        </button>
        <button
          className={cn('text-body-4 text-error-medium', { 'font-normal text-gray-400': !isAnyChecked })}
          onClick={handleDelete}
          disabled={!isAnyChecked}
        >
          삭제
        </button>
      </div>
      {data.map((value, index) => {
        return (
          <div key={index} className="flex max-w-full items-center gap-4">
            <ReceivedCheckbox
              checked={checked[index]}
              onCheckedChange={() => {
                toggleChecked(index);
              }}
            />

            <div className="min-w-0 flex-1">
              <ReceivedCard key={index} cardData={value} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
