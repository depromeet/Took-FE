'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/utils';

type LottieLoadingProps = {
  className?: string;
};
export default function LottieLoading({ className }: LottieLoadingProps) {
  const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

  const [lottieJson, setLottieJson] = useState();

  useEffect(() => {
    fetch('/images/loading.json')
      .then((response) => response.json())
      .then((data) => setLottieJson(data))
      .catch((error) => console.error('Lottie JSON 로딩 실패:', error));
  }, []);

  if (!lottieJson) return null;

  return (
    <div className={cn('flex h-full w-full items-center justify-center')}>
      <Lottie className={cn('h-12 w-12', className)} animationData={lottieJson} loop play />
    </div>
  );
}
