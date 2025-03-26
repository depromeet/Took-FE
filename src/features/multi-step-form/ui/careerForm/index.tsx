'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'sonner';
import { match } from 'ts-pattern';

import { Button } from '@/shared/ui/button';

import { CARD_CREATE_INITIAL_VALUES, TOTAL_STEPS } from '../../config';
import { useCreateCard } from '../../hooks/queries/useCreateCard';
import { cardCreateSchema, CareerFormData } from '../../schema';
import { createCareerFormData } from '../../utils';

import { STEP_VALIDATION_FIELDS } from './constants';
import FirstStep from './firstStep';
import FourthStep from './fourthStep';
import SecondStep from './secondStep';
import ThirdStep from './thridStep';

type CareerFormViewProps = {
  readonly currentStep: number;
  readonly onNextStep: () => void;
};

type StepFormViewProps = {
  readonly currentStep: number;
  readonly handleNextStep: () => void;
};

function CareerFormView({ currentStep, onNextStep }: CareerFormViewProps) {
  const formMethod = useForm<CareerFormData>({
    resolver: zodResolver(cardCreateSchema),
    defaultValues: CARD_CREATE_INITIAL_VALUES,
    mode: 'onChange', // 필드가 변경될 때 검증
  });

  const {
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = formMethod;

  const { mutate: createCardAPI } = useCreateCard(reset);
  // 최종 제출 시 처리
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    const validData = Object.entries(data).filter(([_, value]) => {
      // 배열인 경우
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // 일반 값인 경우
      return value !== '' && value !== null && value !== undefined;
    });

    const filteredData = Object.fromEntries(validData) as CareerFormData;

    createCardAPI(createCareerFormData(filteredData));
  };

  // watch를 사용하여 현재 스텝의 필드 값들을 가져옵니다.
  const watchedValues = watch(STEP_VALIDATION_FIELDS[currentStep]);

  // 모든 필드가 채워졌는지(빈 문자열이 아닌지) 체크
  const isFilled = watchedValues.every((value) => value !== undefined && value.toString().trim() !== '');

  // 에러가 없는지도 함께 체크
  const validateArrayFields = (fields: (keyof CareerFormData)[]) => {
    const arrayFields = ['sns', 'project', 'content'];
    for (const field of fields) {
      if (arrayFields.includes(field)) {
        const arrayValue = watch(field);
        if (Array.isArray(arrayValue)) {
          for (const item of arrayValue) {
            if (typeof item === 'object' && item && item.link.trim() === '') {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const isStepValid =
    isFilled &&
    STEP_VALIDATION_FIELDS[currentStep].every((field) => !errors[field]) &&
    validateArrayFields(STEP_VALIDATION_FIELDS[currentStep]);
  // 각 스텝에 해당하는 필드만 trigger로 검증 후 다음 단계로 이동

  const handleNextStep = async () => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[currentStep];

    if (!fieldsToValidate) return;

    const valid = await trigger(fieldsToValidate);

    if (valid) {
      if (currentStep < TOTAL_STEPS) {
        onNextStep();
      } else {
        // 마지막 단계인 경우 form 제출
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <FormProvider {...formMethod}>
      <form>
        <StepFormView currentStep={currentStep} handleNextStep={handleNextStep} />
      </form>
      {currentStep !== 2 && (
        <Button className="z-100" disabled={!isStepValid} onClick={handleNextStep}>
          {currentStep < TOTAL_STEPS ? '다음' : '명함 완성하기'}
        </Button>
      )}
      <Toaster position="bottom-center" />
    </FormProvider>
  );
}

const StepFormView = ({ currentStep, handleNextStep }: StepFormViewProps) => {
  return match(currentStep)
    .with(1, () => <FirstStep />)
    .with(2, () => <SecondStep handleNextStep={handleNextStep} />)
    .with(3, () => <ThirdStep />)
    .with(4, () => <FourthStep />)
    .otherwise(() => <></>);
};

export default CareerFormView;
