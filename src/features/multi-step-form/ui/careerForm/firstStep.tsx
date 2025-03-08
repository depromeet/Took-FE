import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedInput from '@/shared/ui/Input';
import WrappedTagInput from '@/shared/ui/Input/tagInput';

import AvatarImg from '../../components/AvartarImg';
import { CAREER_FORM } from '../../config';
import { CareerFormData } from '../../schema';

import ErrorMsg from './errorMsg';

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
                <WrappedInput title="이름" placeholder="이름을 입력해주세요." {...field} />
                {errors.name && <ErrorMsg errorMsg={errors.name.message} />}
              </>
            )}
          />
          <Controller
            control={control}
            name="detail_career"
            render={({ field }) => (
              <>
                <WrappedInput title="세부직군" placeholder="세부직군" {...field} />
                {errors.detail_career && <ErrorMsg errorMsg={errors.detail_career.message} />}
              </>
            )}
          />
          <Controller
            control={control}
            name="domain"
            render={({ field }) => (
              <>
                <WrappedTagInput title="관심 도메인" placeholder="관심 도메인" {...field} />
                {/* <WrappedInput title='관심 도메인' placeholder='관심도메인' {...field} />
                {errors.domain && <ErrorMsg errorMsg={errors.domain.message} />} */}
              </>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="한 줄 소개"
                  placeholder="본인을 잘 드러낼 수 있는 문장을 작성해 주세요."
                  {...field}
                />
                {errors.description && <ErrorMsg errorMsg={errors.description.message} />}
              </>
            )}
          />
        </div>
      </section>
    </>
  );
}

export default FirstStep;
