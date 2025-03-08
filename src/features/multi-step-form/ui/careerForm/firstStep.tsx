import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedInput from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/textArea';

import AvatarImg from '../../components/AvartarImg';
import { CAREER_FORM } from '../../config';
import { CareerFormData } from '../../schema';

function FirstStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormData>();

  return (
    <>
      <header className="flex flex-col gap-3">
        <h1 className="text-title-1 text-gray-white">{CAREER_FORM.firstStep.title}</h1>
        <h3 className="text-body-3 text-gray-400">{CAREER_FORM.firstStep.description}</h3>
      </header>
      <section className={cn(spacingStyles({ marginTop: 'xl' }))}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <AvatarImg />
          </div>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="이름"
                  placeholder="이름을 입력해주세요."
                  errorMsg={errors.name?.message}
                  error={!!errors.name?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="detail_career"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="세부직군"
                  placeholder="세부직군"
                  errorMsg={errors.detail_career?.message}
                  error={!!errors.detail_career?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="domain"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="관심 도메인"
                  placeholder="관심 도메인"
                  errorMsg={errors.domain?.message}
                  error={!!errors.domain?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <>
                <Textarea
                  labelTitle="한 줄 소개"
                  totalNumber={40}
                  placeholder="본인을 잘 드러낼 수 있는 문장을 작성해 주세요."
                  size="max"
                  errorMsg={errors.description?.message}
                  error={!!errors.description?.message}
                  {...field}
                />
              </>
            )}
          />
        </div>
      </section>
    </>
  );
}

export default FirstStep;
