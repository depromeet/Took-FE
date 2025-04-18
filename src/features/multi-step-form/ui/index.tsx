'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import Appbar from '@/shared/ui/appbar';
import ProgressBar from '@/shared/ui/progressBar';
import Toast from '@/shared/ui/Toast';

import { CARD_CREATE_INITIAL_VALUES, MINIMUM_STEP, TOTAL_STEPS } from '../config';
import { cardCreateSchema, CareerFormData } from '../schema';
import { resetStepFields } from '../utils';

import CareerFormView from './careerForm';

function MultiStepFormView() {
  const handleBack = useHistoryBack();
  const [currentStep, setCurrentStep] = useState(MINIMUM_STEP);
  const resetTagCount = useCardFormStore((state) => state.resetTagCount);
  const tagArray = useCardFormStore((state) => state.tagArray);

  const formMethod = useForm<CareerFormData>({
    resolver: zodResolver(cardCreateSchema),
    defaultValues: CARD_CREATE_INITIAL_VALUES,
    mode: 'onBlur',
  });

  const { unregister, setValue } = formMethod;

  const handleNextStep = useCallback(() => {
    setCurrentStep((nowStep) => {
      if (nowStep < TOTAL_STEPS) {
        return nowStep + MINIMUM_STEP;
      }
      return nowStep;
    });
  }, []);

  const handleStepBack = useCallback(() => {
    setCurrentStep((nowStep) => {
      if (nowStep > MINIMUM_STEP) {
        resetStepFields(nowStep, setValue, unregister, resetTagCount, tagArray);
        return nowStep - MINIMUM_STEP;
      }
      if (nowStep === MINIMUM_STEP) {
        handleBack();
      }
      return nowStep;
    });
  }, [unregister, resetTagCount, tagArray, setValue, handleBack]);

  return (
    <FormProvider {...formMethod}>
      <div className="relative flex min-h-dvh w-full justify-center">
        <div
          className={cn(
            'relative flex w-full max-w-[600px] flex-col bg-gray-black',
            currentStep === 2 && 'bg-[url(/images/tag/background.webp)] bg-cover bg-center',
          )}
        >
          <Appbar
            hasBackground={currentStep === 2 && false}
            page={currentStep === 2 ? 'none' : 'create'}
            onLeftClick={handleStepBack}
            className="z-bar"
          />
          <ProgressBar className="z-bar" currentStep={currentStep} totalSteps={TOTAL_STEPS} page="cardCreate" />
          <main
            className={cn(
              'flex h-full flex-col gap-4',
              currentStep !== 2
                ? spacingStyles({ paddingX: 'ml' })
                : spacingStyles({ paddingX: 'ml', paddingBottom: 'lg' }),
            )}
          >
            <CareerFormView currentStep={currentStep} onNextStep={handleNextStep} />
          </main>
        </div>
      </div>
      <Toast />
    </FormProvider>
  );
}

export default MultiStepFormView;
