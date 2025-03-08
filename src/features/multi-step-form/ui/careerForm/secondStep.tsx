'use client';

import React from 'react';

import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/header';
import Ball from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/Ball';
import TagBox from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/TagBox';

function SecondStep() {
  return (
    <div className="flex h-dvh w-full justify-center overflow-hidden">
      <div className="flex h-dvh w-full max-w-[600px] flex-col items-center justify-start gap-4 border border-white bg-[url(/images/tag/background.png)] bg-cover bg-center">
        <div className="w-full"></div>
        <main className="relative mb-4 flex h-dvh w-full flex-col items-center justify-between">
          <Header title={`명함에 추가할 태그를 \n 선택해 주세요`} />
          <Ball />
          <TagBox />
        </main>
      </div>
    </div>
  );
}

export default SecondStep;
