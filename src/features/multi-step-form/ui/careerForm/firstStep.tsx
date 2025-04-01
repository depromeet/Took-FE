'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useRegisterQuery } from '@/features/new-card/hooks/queries/useRegisterQuery';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import SearchDropdown, { SearchOptions } from '@/shared/ui/dropDown/searchDropdown';
import WrappedInput from '@/shared/ui/Input';
import TagInput from '@/shared/ui/tagInput';
import { Textarea } from '@/shared/ui/textArea';

import AvatarImg from '../../components/AvartarImg';
import { CAREER_FORM } from '../../config';
import { CareerFormData } from '../../schema';

const MAX_SUMMARY_LENGTH = 40;

function FirstStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormData>();

  const job = useCardFormStore((state) => state.job);

  const { data: careerOptions } = useRegisterQuery({
    job: job,
  });

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
            name="nickname"
            render={({ field }) => (
              <WrappedInput
                title="이름"
                placeholder="명함에 노출될 이름을 입력해주세요."
                errorMsg={errors.nickname?.message}
                error={!!errors.nickname?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="detailJobId"
            render={({ field }) => {
              const { onChange: fieldOnChange, value: fieldValue, ...props } = field;

              // 선택된 옵션에서 value만 추출하여 전달하는 핸들러
              const handleChange = (selectedOption: SearchOptions | null) => {
                fieldOnChange(selectedOption ? selectedOption.id : null);
              };

              // 현재 필드의 값(fieldValue)에 해당하는 옵션을 찾아 selectedOption에 할당
              const selectedOptionValue = careerOptions?.find((option) => option.id === fieldValue) || null;

              return (
                <SearchDropdown
                  title="세부직군"
                  placeholder="직군을 입력해주세요."
                  errorMsg={errors.detailJobId?.message}
                  options={careerOptions ?? []}
                  value={selectedOptionValue}
                  onChange={handleChange}
                  {...props}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="interestDomain"
            render={({ field }) => (
              <TagInput
                title="관심 도메인"
                placeholder="어떤 분야에 관심이 있나요?"
                errorMsg={errors.interestDomain?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="summary"
            render={({ field }) => (
              <Textarea
                labelTitle="한 줄 소개"
                totalNumber={MAX_SUMMARY_LENGTH}
                placeholder="본인을 잘 드러낼 수 있는 문장을 작성해 주세요."
                size="max"
                errorMsg={errors.summary?.message}
                error={!!errors.summary?.message}
                {...field}
              />
            )}
          />
        </div>
      </section>
    </>
  );
}

export default FirstStep;
