import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';

import { Button } from '@/shared/ui/button';

import { TOTAL_STEPS } from '../../config';
import { cardCreateSchema, CareerFormData } from '../../schema';

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
  detailJobId: '',
  interestDomain: [],
  summary: '',
  organization: '',
  sns: [
    {
      type: '',
      link: '',
    },
  ],
  region: '',
  hobby: '',
  news: '',
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
};

const stepValidationFields: Record<number, (keyof CareerFormData)[]> = {
  1: ['nickname', 'detailJobId', 'interestDomain', 'summary'],
  2: [],
  3: ['organization', 'sns', 'region', 'hobby', 'news', 'content', 'project'],
  4: [],
};

function CareerFormView({ currentStep, onNextStep }: CareerFormViewProps) {
  const formMethod = useForm<CareerFormData>({
    resolver: zodResolver(cardCreateSchema),
    defaultValues: initialValues,
    mode: 'onChange', // 필드 값이 변경될 때마다 검증
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = formMethod;

  // 최종 제출 시 처리
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    console.log('최종 제출 데이터', data);
  };

  // watch를 사용하여 현재 스텝의 필드 값들을 가져옵니다.
  const watchedValues = watch(stepValidationFields[currentStep]);

  // console.log('watchedValues', watchedValues);

  // 모든 필드가 채워졌는지(빈 문자열이 아닌지) 체크
  const isFilled = watchedValues.every((value) => value !== undefined && value.toString().trim() !== '');

  // 에러가 없는지도 함께 체크
  const isStepValid = isFilled && stepValidationFields[currentStep].every((field) => !errors[field]);
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
