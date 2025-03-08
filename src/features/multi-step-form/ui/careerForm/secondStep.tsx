'use client';

import React, { useState } from 'react';

import Ball from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/Ball';
import TagBox from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/TagBox';
import Header from '@/shared/ui/header';

function SecondStep() {
  const [tagCount, setTagCount] = useState(0);
  const [tagArray, setTagArray] = useState<string[]>([]);
  // const [a, b] = useState<Record<string, string | number>[]>();

  return (
    <div className="h-[72dvh] items-center justify-start gap-4 overflow-hidden">
      <main className="relative flex h-full w-full flex-col items-center justify-between">
        <Header title={`명함에 추가할 태그를 \n 선택해 주세요`} />
        <Ball tagCount={tagCount} />
        <div className="relative h-full w-full">
          <TagBox tagCount={tagCount} tagArray={tagArray} setTagCount={setTagCount} setTagArray={setTagArray} />
        </div>
      </main>
    </div>
  );
}

export default SecondStep;
