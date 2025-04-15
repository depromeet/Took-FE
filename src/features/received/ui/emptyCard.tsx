import Image from 'next/image';
import React from 'react';

type EmptyCardProps = {
  message: string;
};

export default function EmptyCard({ message = '받은 명함이 없어요.' }: EmptyCardProps) {
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center">
      <Image src="/icons/emptyCardIcon.svg" alt="받은 명함이 없어요." width={100} height={100} />
      <p className="text-body-3 text-gray-50">{message}</p>
    </div>
  );
}
