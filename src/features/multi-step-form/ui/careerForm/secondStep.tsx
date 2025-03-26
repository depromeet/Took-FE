'use client';

import { useShallow } from 'zustand/shallow';

import Ball from '@/features/multi-step-form/ui/careerForm/tagFormStep/ui/Ball';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/header';

import TagBox from './tagFormStep/ui/TagBox';

type SecondStepProps = {
  readonly handleNextStep: () => void;
};

const MIN_TAG_COUNT = 2;

function SecondStep({ handleNextStep }: SecondStepProps) {
  const { setTagArray, resetTagCount } = useCardFormStore(
    useShallow((state) => ({
      setTagArray: state.setTagArray,
      resetTagCount: state.resetTagCount,
    })),
  );

  const tagCount = useCardFormStore(useShallow((state) => state.tagCount));

  const handleReset = () => {
    setTagArray([]);
    resetTagCount();
  };

  return (
    <>
      <div className="h-[72dvh] w-full items-center justify-start gap-4 overflow-hidden">
        <main className="relative flex h-full w-full flex-col items-center justify-between">
          <Header title={`명함에 추가할 태그를 \n 최소 2개 이상 선택해 주세요`} />
          <Ball tagCount={tagCount} />
          <div className="relative h-full w-full">
            <TagBox />
          </div>
        </main>
      </div>
      <div className="z-100 flex h-auto w-full gap-2">
        {tagCount !== 0 && (
          <Button className="w-full" variant="prev" onClick={handleReset}>
            다시 담기
          </Button>
        )}

        <Button className="w-full" disabled={tagCount < MIN_TAG_COUNT} onClick={handleNextStep}>
          다음
        </Button>
      </div>
    </>
  );
}

export default SecondStep;
