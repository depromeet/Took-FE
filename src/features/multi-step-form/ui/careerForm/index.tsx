import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { match } from 'ts-pattern';

import { Button } from '@/shared/ui/button';

import { TOTAL_STEPS } from '../../config';
import { cardCreateSchema, CareerFormData } from '../../schema';

import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thridStep';

type CareerFormViewProps = {
  currentStep: number;
  onNextStep: () => void;
};

type StepFormViewProps = {
  currentStep: number;
};

const initialValues: CareerFormData = {
  name: '',
  detail_career: '',
  domain: '',
  description: '',
};

const stepValidationFields: Record<number, (keyof CareerFormData)[]> = {
  1: ['name', 'detail_career', 'domain', 'description'],
  2: [],
  3: [],
  4: [],
};

function CareerFormView({ currentStep, onNextStep }: CareerFormViewProps) {
  const formMethod = useForm<CareerFormData>({
    resolver: zodResolver(cardCreateSchema),
    defaultValues: initialValues,
    mode: 'onChange', // 필드 값이 변경될 때마다 검증
  });

  const { handleSubmit, trigger } = formMethod;

  // 최종 제출 시 처리
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    console.log('최종 제출 데이터', data);
  };

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
          <StepFormView currentStep={currentStep} />
        </form>
        <Button onClick={handleNextStep}>{currentStep < TOTAL_STEPS ? '다음' : '제출'}</Button>
      </FormProvider>
    </>
  );
}

const StepFormView = ({ currentStep }: StepFormViewProps) => {
  return match(currentStep)
    .with(1, () => <FirstStep />)
    .with(2, () => <SecondStep />)
    .with(3, () => <ThirdStep />)
    .otherwise(() => <></>);
};

export default CareerFormView;
