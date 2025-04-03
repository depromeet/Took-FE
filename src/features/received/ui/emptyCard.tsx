import Image from 'next/image';
import React from 'react';

export default function EmptyCard() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Image src="/icons/emptyCardIcon.svg" alt="현재 등록된 명함이 없어요." width={160} height={160} />
      <p className="text-body-3 text-gray-50">현재 등록된 명함이 없어요.</p>
    </div>
  );
}
