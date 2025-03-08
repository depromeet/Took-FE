"use client";

import { useCallback, useState } from 'react';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import ProgressBar from '@/shared/ui/progressBar';

import { MINIMUM_STEP, TOTAL_STEPS } from '../config';

import CareerFormView from './careerForm';

function MultiStepFormView() {
  const handleBack = useHistoryBack();
  const [currentStep, setCurrentStep] = useState(MINIMUM_STEP);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < TOTAL_STEPS) {
        return prev + MINIMUM_STEP;
      }
      return prev;
    });
  }, [currentStep]);

  const handleStepBack = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev > MINIMUM_STEP) {
        return prev - MINIMUM_STEP;
      }
      // MINIMUM_STEP단계인 경우 뒤로가기
      if (prev === MINIMUM_STEP) {
        handleBack();
      }
      return prev;
    });
  }, [currentStep]);

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className='flex flex-col w-full max-w-[600px] bg-gray-black'>
        <Appbar page='create' onLeftClick={handleStepBack} />
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <main className={cn('flex flex-col gap-4', spacingStyles({ paddingX: 'ml', paddingY: 'lg' }))}>
          <CareerFormView currentStep={currentStep} onNextStep={handleNextStep} />
        </main>
      </div >
    </div>
  )
}

export default MultiStepFormView;