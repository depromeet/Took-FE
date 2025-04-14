'use client';

import { useEffect } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { match } from 'ts-pattern';

import { useUpdateCardStore } from '@/features/card-detail/store/updateCardStore';
import { CardJobType, useRegisterQuery } from '@/features/new-card/hooks/queries/useRegisterQuery';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { Button } from '@/shared/ui/button';

import { TOTAL_STEPS } from '../../config';
import { useCreateCard } from '../../hooks/queries/useCreateCard';
import { useUpdateCard } from '../../hooks/queries/useUpdateCard';
import { useUpdateCardInfo } from '../../hooks/queries/useUpdateCardInfo';
import { CareerFormData } from '../../schema';
import { createCareerFormData } from '../../utils';

import { getStepValidationFields } from './constants';
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
  const formMethod = useFormContext<CareerFormData>();

  // Zustand 스토어에서 상태 가져오기
  const { cardId, isEditMode, resetState } = useUpdateCardStore();
  const { mutate: getCardInfo, data: cardData } = useUpdateCardInfo();

  const {
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = formMethod;

  // 카드 생성 및 수정 API 훅
  const { mutate: createCardAPI } = useCreateCard(reset);
  const { mutate: updateCardAPI } = useUpdateCard(reset);

  const job = useCardFormStore((state) => state.job);

  // 수정 명함 카드 정보 가져오기
  const { data: careerOptions } = useRegisterQuery({
    job: isEditMode ? (cardData?.data.job as CardJobType) : job,
  });

  // 수정 모드일 경우 카드 정보 가져오기
  useEffect(() => {
    if (isEditMode && cardId) {
      getCardInfo(cardId);
    }
  }, [isEditMode, cardId, getCardInfo]);

  // 카드 데이터가 있으면 폼에 채우기
  useEffect(() => {
    if (cardData?.data) {
      const card = cardData.data;

      // 기본 필드 설정
      setValue('nickname', card.nickname);
      setValue('organization', card.organization || '');

      if (careerOptions && card.detailJob) {
        const matchingOption = careerOptions.find((option) => option.value === card.detailJob);

        if (matchingOption) {
          setValue('detailJobId', matchingOption.id);
        }
      }

      setValue('summary', card.summary);
      setValue('interestDomain', card.interestDomain || []);
      setValue('previewInfoType', card.previewInfoType || '');

      // previewInfo 내의 데이터 설정
      if (card.previewInfo) {
        // SNS 설정
        if (card.previewInfo.sns) {
          setValue('sns', [
            {
              type: card.previewInfo.sns.type,
              link: card.previewInfo.sns.link,
            },
          ]);
        }

        // Project 설정
        if (card.previewInfo.project) {
          setValue('project', [
            {
              type: 'project',
              link: card.previewInfo.project.link,
              title: card.previewInfo.project.title,
              imageUrl: card.previewInfo.project.imageUrl,
              description: card.previewInfo.project.description,
            },
          ]);
        }

        // Content 설정
        if (card.previewInfo.content) {
          setValue('content', [
            {
              type: 'blog',
              link: card.previewInfo.content.link,
              title: card.previewInfo.content.title,
              imageUrl: card.previewInfo.content.imageUrl,
              description: card.previewInfo.content.description,
            },
          ]);
        }

        // 기타 필드 설정
        if (card.previewInfo.hobby) setValue('hobby', card.previewInfo.hobby);
        if (card.previewInfo.news) setValue('news', card.previewInfo.news);
        if (card.previewInfo.region) setValue('region', card.previewInfo.region);
      }

      // 프로필 이미지는 별도 처리 필요
    }
  }, [cardData, setValue, careerOptions]);

  // 최종 제출 시 처리
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    const validData = Object.entries(data).filter(([_, value]) => {
      // 배열인 경우
      if (Array.isArray(value)) {
        return value.length > 0 && value.every((item) => item.link && item.link !== '');
      }
      // 일반 값인 경우
      return value !== '' && value !== null && value !== undefined;
    });

    const filteredData = Object.fromEntries(validData) as CareerFormData;
    const formData = createCareerFormData(filteredData);

    // 수정 모드에 따라 다른 API 호출
    if (isEditMode && cardId) {
      updateCardAPI({
        cardId,
        formData,
        onSuccess: () => {
          resetState();
        },
      });
    } else {
      createCardAPI(formData);
    }
  };

  // watch를 사용하여 현재 스텝의 필드 값들을 가져옵니다.
  const watchedValues = watch(getStepValidationFields()[currentStep]);

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
    getStepValidationFields()[currentStep].every((field) => !errors[field]) &&
    validateArrayFields(getStepValidationFields()[currentStep]);

  const handleNextStep = async () => {
    const fieldsToValidate = getStepValidationFields()[currentStep];

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
      <form>
        <StepFormView currentStep={currentStep} handleNextStep={handleNextStep} />
      </form>
      {currentStep !== 2 && (
        <Button className="z-100" disabled={!isStepValid} onClick={handleNextStep}>
          {currentStep < TOTAL_STEPS ? '다음' : isEditMode ? '명함 수정하기' : '명함 완성하기'}
        </Button>
      )}
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
