'use client';

import { useEffect } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { match } from 'ts-pattern';

import { useUpdateCardStore } from '@/features/card-detail/store/updateCardStore';
import { useRegisterQuery } from '@/features/new-card/hooks/queries/useRegisterQuery';
import { JopType } from '@/features/share/types';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { Button } from '@/shared/ui/button';

import { TOTAL_STEPS } from '../../config';
import { useCreateCard } from '../../hooks/queries/useCreateCard';
import { useUpdateCard } from '../../hooks/queries/useUpdateCard';
import { useUpdateCardInfo } from '../../hooks/queries/useUpdateCardInfo';
import { CareerFormData } from '../../schema';
import { CardUpdateDto } from '../../types';
import { createCareerFormData } from '../../utils';

import { getStepValidationFields } from './constants';
import FirstStep from './firstStep';
import FourthStep from './fourthStep';
import SecondStep from './secondStep';
import { TagValue } from './tagFormStep/config/config';
import ThirdStep from './thridStep';

type CareerFormViewProps = {
  readonly currentStep: number;
  readonly onNextStep: () => void;
};

type StepFormViewProps = {
  readonly currentStep: number;
  readonly handleNextStep: () => void;
  cardData?: CardUpdateDto;
};

function CareerFormView({ currentStep, onNextStep }: CareerFormViewProps) {
  const formMethod = useFormContext<CareerFormData>();

  // Zustand 스토어에서 상태 가져오기
  const { cardId, isEditMode } = useUpdateCardStore();
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
  const setJob = useCardFormStore((state) => state.setJob);

  const { data: careerOptions } = useRegisterQuery({
    job: job,
  });

  // 수정 모드일 경우 카드 정보 가져오기
  useEffect(() => {
    if (isEditMode && cardId) {
      getCardInfo(cardId);
    }
  }, [isEditMode, cardId, getCardInfo]);

  // 카드 데이터 설정 함수 - 수정 모드에서 사용
  const setCardFormData = (card: CardUpdateDto['data']) => {
    const tags: TagValue[] = [];

    // 직업 설정
    setJob(card.job as JopType);

    // 기본 필드 설정
    setValue('nickname', card.nickname);
    setValue('summary', card.summary);
    setValue('interestDomain', card.interestDomain || []);
    setValue('previewInfoType', card.previewInfoType || '');

    // 소속 정보 설정
    if (card?.organization) {
      tags.push('organization');
      setValue('organization', card.organization);
    }

    // detailJob 설정
    if (careerOptions && card.detailJob) {
      const matchingOption = careerOptions.find((option) => option.value === card.detailJob);
      if (matchingOption) {
        setValue('detailJobId', matchingOption.id);
      }
    }

    // SNS 데이터 설정
    if (card.sns && card.sns.length > 0) {
      tags.push('sns');
      const snsItems = card.sns.map((item) => ({
        type: item.type,
        link: item.link,
      }));
      setValue('sns', snsItems);
    }

    // Project 데이터 설정
    if (card.project && card.project.length > 0) {
      tags.push('project');
      const projectItems = card.project.map((item) => ({
        type: 'project' as const,
        link: item.link,
        title: item.title,
        imageUrl: item.imageUrl,
        description: item.description,
      }));
      setValue('project', projectItems);
    }

    // Content 데이터 설정
    if (card.content && card.content.length > 0) {
      tags.push('content');
      const contentItems = card.content.map((item) => ({
        type: 'blog' as const,
        link: item.link,
        title: item.title,
        imageUrl: item.imageUrl,
        description: item.description,
      }));
      setValue('content', contentItems);
    }

    // 선택적 필드 설정
    if (card.hobby) {
      tags.push('hobby');
      setValue('hobby', card.hobby);
    }

    if (card.news) {
      tags.push('news');
      setValue('news', card.news);
    }

    if (card.region) {
      tags.push('region');
      setValue('region', card.region);
    }

    // 태그 상태 업데이트
    useCardFormStore.setState({
      tagArray: tags,
      tagCount: tags.length,
    });
  };

  // 카드 데이터가 있으면 폼에 채우기 - 수정
  useEffect(() => {
    if (cardData?.data && isEditMode) {
      setCardFormData(cardData.data);
    }
  }, [cardData, isEditMode, careerOptions]);

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
    <div className="flex h-[calc(100dvh-92px)] flex-col justify-between">
      <form className="flex-1 overflow-y-scroll pb-[36px] pt-[24px] scrollbar-hide">
        <StepFormView currentStep={currentStep} handleNextStep={handleNextStep} cardData={cardData} />
      </form>

      <div className="h-[20px] w-full bg-gradient-to-b from-transparent to-[#14151A]"></div>
      <div className="z-100 w-full pb-[18px]">
        {currentStep !== 2 && (
          <Button className="w-full" disabled={!isStepValid} onClick={handleNextStep}>
            {currentStep < TOTAL_STEPS ? '다음' : isEditMode ? '명함 수정하기' : '명함 완성하기'}
          </Button>
        )}
      </div>
    </div>
  );
}

const StepFormView = ({ currentStep, handleNextStep, cardData }: StepFormViewProps) => {
  return match(currentStep)
    .with(1, () => <FirstStep cardData={cardData} />)
    .with(2, () => <SecondStep handleNextStep={handleNextStep} />)
    .with(3, () => <ThirdStep />)
    .with(4, () => <FourthStep cardData={cardData} />)
    .otherwise(() => <></>);
};

export default CareerFormView;
