'use client';

import { useShallow } from 'zustand/shallow';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/header';

import { Ball } from './tagFormStep/ui/Ball';
// import MotionTagBox from './tagFormStep/ui/MotionTagBox';
// import TagBox from './tagFormStep/ui/TagBox';
import TmpTagBox from './tagFormStep/ui/TmpTagBox';

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

  const circleStyles = ['absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  overflow-hidden rounded-full'];

  const shadowStyles = [
    'shadow-[0px_0px_11.9px_rgba(103,68,255,0.2),_inset_0px_0px_54.5px_rgba(208,195,255,0.2)]',
    'shadow-[0px_0px_11.9px_rgba(103,68,255,0.3),_inset_0px_0px_54.5px_rgba(208,195,255,0.3)]',
  ];
  return (
    <>
      <div className="h-[72dvh] w-full items-center justify-start gap-4 overflow-hidden">
        <main
          className={cn(
            spacingStyles({ paddingTop: 'lg' }),
            `relative flex h-full w-full flex-col items-center justify-between`,
          )}
        >
          <Header title={`명함에 추가할 태그를 \n 최소 2개 이상 선택해 주세요`} />
          <Ball tagCount={tagCount} />
          <div
            className={cn(
              'pointer-events-none z-10 h-[494px] w-[494px] opacity-40',
              circleStyles.join(' '),
              shadowStyles[0],
              'firstWave',
            )}
          />
          <div
            className={cn(
              'pointer-events-none z-20 h-72 w-72 opacity-50',
              circleStyles.join(' '),
              shadowStyles[1],
              'secondWave',
            )}
          />
          <div className="relative h-full w-full">
            {/* <TagBox /> */}
            {/* <MotionTagBox /> */}
            <TmpTagBox />
          </div>
        </main>
      </div>
      <div className="z-100 absolute bottom-[18px] left-0 flex h-auto w-full gap-2 px-[20px]">
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
