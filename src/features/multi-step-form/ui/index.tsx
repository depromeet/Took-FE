"use client";

import { useCallback, useState } from 'react';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { Button } from '@/shared/ui/button';
import ProgressBar from '@/shared/ui/progressBar';

import CareerFormView from './careerForm';

function MultiStepFormView() {
  const handleBack = useHistoryBack();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 4) {
        return prev + 1;
      }
      return prev;
    });
  }, [currentStep]);

  const handleStepBack = () => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      // 1단계인 경우 뒤로가기
      if (prev === 1) {
        handleBack();
      }
      return prev;
    });
  }

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className='flex flex-col w-full max-w-[600px] bg-gray-black'>
        <Appbar page='create' onLeftClick={handleStepBack} />
        <ProgressBar currentStep={currentStep} totalSteps={4} />
        <main className={cn('flex flex-col gap-4', spacingStyles({ paddingX: 'ml', paddingY: 'lg' }))}>
          <CareerFormView currentStep={currentStep} />
          <Button onClick={handleNextStep}>등록</Button>
        </main>
      </div >
    </div>
  )
}

export default MultiStepFormView;