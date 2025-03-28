import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import { ROUTE_PATH } from '../config';

export default function Intellibanner() {
  const router = useRouter();

  // 새로운 명함 만들기
  const handleInteresting = () => {
    router.push(ROUTE_PATH.interesting);
  };
  return (
    <header
      style={{
        backgroundImage: "url('/images/received/banner.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={cn(
        'background relative flex h-52 w-auto cursor-pointer flex-col items-start justify-end rounded-2xl',
        spacingStyles({ marginTop: 'md', paddingX: 'md', paddingBottom: 'ml' }),
      )}
      onClick={handleInteresting}
    >
      <div className="flex w-full items-end justify-between">
        <h3 className="whitespace-pre-line text-title-4 text-white">{`오늘 공유한 명함 중 \n 흥미로운 명함이 있어요!`}</h3>
        <button className="flex h-6 w-6 items-center justify-center">
          <Image src="/icons/rightArrow.svg" alt="화살표 아이콘" width={7.5} height={15} />
        </button>
      </div>
      <p className="text-caption-1 text-gray-100">나와 같은 공통점을 가진 사람이 있어요</p>
    </header>
  );
}
