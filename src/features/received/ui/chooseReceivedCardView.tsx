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

  useEffect(() => {
    setChecked(new Array(data.length).fill(false)); // data 길이에 맞게 초기화
    console.log(checked);
  }, [data]);

  const toggleChecked = (index: number) => {
    setChecked(
      (prev) => prev.map((value, i) => (i === index ? !value : value)), // ✅ 새 배열을 반환해야 정상 동작
    );
  };

  const handleDelete = () => {
    const filteredData = data.filter((_, index) => !checked[index]);
    console.log('삭제 후 남은 데이터:', filteredData);
    // 🔹 실제 삭제 API 요청이 필요하면 여기에 추가
    setChecked(new Array(filteredData.length).fill(false)); // 체크 상태 초기화
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-3 text-body-4 font-bold">
        <button className={cn('text-white')} onClick={openModal}>
          폴더 설정
        </button>
        <button onClick={handleDelete} className={cn('text-body-4 text-error-medium')}>
          삭제
        </button>
      </div>
      {data.map((value, index) => {
        return (
          <div key={index} className="flex items-center gap-4">
            <ReceivedCheckbox
              checked={checked[index]}
              onCheckedChange={() => {
                toggleChecked(index);
              }}
            />
            <ReceivedCard key={index} cardData={value} />
          </div>
        );
      })}
    </div>
  );
}
