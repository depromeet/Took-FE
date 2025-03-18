'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';

import { useCardFormStore } from '@/shared/store/cardFormState';
import { Button } from '@/shared/ui/button';

import { TOTAL_STEPS } from '../../config';
import { useCreateCard } from '../../hooks/queries/useCreateCard';
import { cardCreateSchema, CareerFormData } from '../../schema';
import { createCareerFormData } from '../../utils';

import FirstStep from './firstStep';
import FourthStep from './fourthStep';
import SecondStep from './secondStep';
import ThirdStep from './thridStep';

type CareerFormViewProps = {
  currentStep: number;
  onNextStep: () => void;
};

type StepFormViewProps = {
  currentStep: number;
  handleNextStep: () => void;
};

const initialValues: CareerFormData = {
  profileImage: '',
  nickname: '',
  detailJobId: 0,
  interestDomain: [],
  summary: '',
  organization: undefined,
  sns: [
    {
      type: 'blog',
      link: '',
    },
  ],
  region: undefined,
  hobby: undefined,
  news: undefined,
  content: [
    {
      type: 'blog',
      link: '',
      title: '',
      imageUrl: '',
      description: '',
    },
  ],
  project: [
    {
      type: 'project',
      link: '',
      title: '',
      imageUrl: '',
      description: '',
    },
  ],
  previewInfoType: 'PROJECT',
};

function CareerFormView({ currentStep, onNextStep }: CareerFormViewProps) {
  const formMethod = useForm<CareerFormData>({
    resolver: zodResolver(cardCreateSchema),
    defaultValues: initialValues,
    mode: 'onBlur', // 필드가 포커스를 잃었을 때 검증
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = formMethod;

  const { mutate: createCardAPI } = useCreateCard();

  const validationTagArray = useCardFormStore((state) => state.tagArray);

  const stepValidationFields: Record<number, (keyof CareerFormData)[]> = {
    1: ['profileImage', 'nickname', 'detailJobId', 'interestDomain', 'summary'],
    2: [],
    3: validationTagArray,
    4: [],
  };

  // 최종 제출 시 처리
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    // console.log(data);
    createCardAPI(createCareerFormData(data));
  };

  // watch를 사용하여 현재 스텝의 필드 값들을 가져옵니다.
  const watchedValues = watch(stepValidationFields[currentStep]);

  // 모든 필드가 채워졌는지(빈 문자열이 아닌지) 체크
  const isFilled = watchedValues.every((value) => value !== undefined && value.toString().trim() !== '');

  // 에러가 없는지도 함께 체크
  const validateArrayFields = (fields: (keyof CareerFormData)[]) => {
    const arrayFields = ['sns', 'project', 'content'];
    for (const field of fields) {
      if (arrayFields.includes(field)) {
        const arrayValue = watch(field) as any[];
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
    stepValidationFields[currentStep].every((field) => !errors[field]) &&
    validateArrayFields(stepValidationFields[currentStep]);
  // 각 스텝에 해당하는 필드만 trigger로 검증 후 다음 단계로 이동

  const handleNextStep = async () => {
    const fieldsToValidate = stepValidationFields[currentStep];

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
    <>
      <FormProvider {...formMethod}>
        <form>
          <StepFormView currentStep={currentStep} handleNextStep={handleNextStep} />
        </form>
        {currentStep !== 2 && (
          <Button className="z-100" disabled={!isStepValid} onClick={handleNextStep}>
            {currentStep < TOTAL_STEPS ? '다음' : '제출'}
          </Button>
        )}
      </FormProvider>
    </>
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
