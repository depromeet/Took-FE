import { Controller, useFormContext } from 'react-hook-form';

import { CAREER_FORM } from '@/features/multi-step-form/config';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedInput from '@/shared/ui/Input';

import { CareerFormData } from '../../schema';

function ThirdStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormData>();

  return (
    <>
      <header className="flex flex-col gap-3">
        <div>
          <h1 className="text-title-1 text-gray-white">{CAREER_FORM.thirdStep.title}</h1>
          <h1 className="text-title-1 text-gray-white">{CAREER_FORM.thirdStep.subTitle}</h1>
        </div>
        <h3 className="text-body-3 text-gray-400">{CAREER_FORM.thirdStep.description}</h3>
      </header>
      <section className={cn(spacingStyles({ marginTop: 'xl' }))}>
        <div className="flex flex-col gap-4">
          <WrappedInput title="소속 정보" placeholder="소속 정보를 입력해주세요." />
          <WrappedInput title="SNS" variant="withBtn" placeholder="SNS" />
          <WrappedInput title="활동지역" placeholder="활동지역을 입력해주세요." />
          <WrappedInput title="취미" placeholder="취미" />
          <WrappedInput title="최근 소식" placeholder="최근 소식" />
          <WrappedInput title="작성한 글" variant="withBtn" placeholder="작성한 글" />
          <WrappedInput title="대표 프로젝트" variant="withBtn" placeholder="대표 프로젝트" />
        </div>
      </section>
    </>
  );
}

export default ThirdStep;
