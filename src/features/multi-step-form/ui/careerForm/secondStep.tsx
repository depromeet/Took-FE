'use client';

import React, { useState } from 'react';

import Ball from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/Ball';
import TagBox from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/TagBox';
import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/header';

function SecondStep() {
  const [tagCount, setTagCount] = useState(0);
  const [tagArray, setTagArray] = useState<string[]>([]);
  // const [a, b] = useState<Record<string, string | number>[]>();

  return (
    <>
      <div className="h-[72dvh] w-full items-center justify-start gap-4 overflow-hidden">
        <main className="relative flex h-full w-full flex-col items-center justify-between">
          <Header title={`명함에 추가할 태그를 \n 선택해 주세요`} />
          <Ball tagCount={tagCount} />
          <div className="relative h-full w-full">
            <TagBox tagCount={tagCount} tagArray={tagArray} setTagCount={setTagCount} setTagArray={setTagArray} />
          </div>
        </main>
      </div>
      <div className="z-100 flex h-auto w-full gap-2">
        {tagCount !== 0 && (
          <Button
            className="w-full"
            variant="prev"
            onClick={() => {
              setTagCount(0);
              setTagArray([]);
            }}
          >
            다시 담기
          </Button>
        )}

        <Button className="w-full" disabled={tagCount === 0}>
          다음
        </Button>
      </div>
    </>
  );
}

export default SecondStep;
