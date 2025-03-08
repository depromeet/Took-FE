'use client';

import React from 'react';

import Ball from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/Ball';
import TagBox from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/TagBox';
import Header from '@/shared/ui/header';

function SecondStep() {
  return (
    <div className="h-[72dvh] items-center justify-start gap-4 overflow-hidden">
      <main className="relative flex h-full w-full flex-col items-center justify-between">
        <Header title={`명함에 추가할 태그를 \n 선택해 주세요`} />
        <Ball />
        <div className="relative h-full w-full">
          <TagBox />
        </div>
      </main>
    </div>
  );
}

export default SecondStep;
