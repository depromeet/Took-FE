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
          <Controller
            control={control}
            name="organization"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="소속 정보"
                  placeholder="소속 정보를 입력해주세요."
                  errorMsg={errors.organization?.message}
                  error={!!errors.organization?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="sns"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="SNS"
                  placeholder="SNS 주소를 입력해주세요."
                  errorMsg={errors.sns?.message}
                  error={!!errors.sns?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="활동 지역"
                  placeholder="주로 활동하는 지역을 입력해 주세요."
                  errorMsg={errors.region?.message}
                  error={!!errors.region?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="hobby"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="취미"
                  placeholder="대화의 시작이 될 수 있는 관심사를 입력해 보세요."
                  errorMsg={errors.hobby?.message}
                  error={!!errors.hobby?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="news"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="최근 소식"
                  placeholder="직무,프로젝트,커리어 변화 소식을 공유해보세요."
                  errorMsg={errors.news?.message}
                  error={!!errors.news?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="작성한 글"
                  placeholder="작성한 글"
                  errorMsg={errors.content?.message}
                  error={!!errors.content?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="project"
            render={({ field }) => (
              <>
                <WrappedInput
                  title="대표 프로젝트"
                  placeholder="대표 프로젝트"
                  errorMsg={errors.project?.message}
                  error={!!errors.project?.message}
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

export default ThirdStep;
