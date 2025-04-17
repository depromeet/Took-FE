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

  // 카드 데이터가 있으면 폼에 채우기 - 수정
  useEffect(() => {
    // 이미 데이터가 설정된 경우를 방지하기 위한 플래그
    let isInitialized = false;

    if (cardData?.data && isEditMode && !isInitialized) {
      isInitialized = true;
      const card = cardData.data;

      // 초기화 시 사용할 태그 배열
      const tags = [];

      // 수정할 때 직업 저장
      setJob(card.job as JopType);

      // 기본 필드 설정
      setValue('nickname', card.nickname);

      if (card?.organization) {
        tags.push('organization');
        setValue('organization', card.organization || '');
      }

      // detailJob 설정
      if (careerOptions && card.detailJob) {
        const matchingOption = careerOptions.find((option) => option.value === card.detailJob);
        if (matchingOption) {
          setValue('detailJobId', matchingOption.id);
        }
      }

      setValue('summary', card.summary);
      setValue('interestDomain', card.interestDomain || []);
      setValue('previewInfoType', card.previewInfoType || '');

      // SNS 데이터 설정 - 루트 레벨에서 가져옴
      if (card.sns && card.sns.length > 0) {
        tags.push('sns');
        // 모든 SNS 항목을 매핑하여 배열로 설정
        const snsItems = card.sns.map((item) => ({
          type: item.type,
          link: item.link,
        }));
        setValue('sns', snsItems);
      }

      // Project 데이터 설정 - 루트 레벨에서 가져옴
      if (card.project && card.project.length > 0) {
        tags.push('project');
        // 모든 프로젝트 항목을 매핑하여 배열로 설정
        const projectItems = card.project.map((item) => ({
          type: 'project' as const,
          link: item.link,
          title: item.title,
          imageUrl: item.imageUrl,
          description: item.description,
        }));
        setValue('project', projectItems);
      }

      // Content 데이터 설정 - 루트 레벨에서 가져옴
      if (card.content && card.content.length > 0) {
        tags.push('content');
        // 모든 콘텐츠 항목을 매핑하여 배열로 설정
        const contentItems = card.content.map((item) => ({
          type: 'blog' as const,
          link: item.link,
          title: item.title,
          imageUrl: item.imageUrl,
          description: item.description,
        }));
        setValue('content', contentItems);
      }

      // Hobby 데이터 설정
      if (card.hobby) {
        tags.push('hobby');
        setValue('hobby', card.hobby);
      }

      // News 데이터 설정
      if (card.news) {
        tags.push('news');
        setValue('news', card.news);
      }

      // Region 데이터 설정
      if (card.region) {
        tags.push('region');
        setValue('region', card.region);
      }

      // 모든 데이터 설정 후 한 번에 태그 상태 업데이트
      useCardFormStore.setState({
        tagArray: tags as TagValue[],
        tagCount: tags.length,
      });
    }
  }, [cardData, setValue, careerOptions, isEditMode, setJob]);

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
    <>
      <form>
        <StepFormView currentStep={currentStep} handleNextStep={handleNextStep} cardData={cardData} />
      </form>
      {currentStep !== 2 && (
        <Button className="z-100" disabled={!isStepValid} onClick={handleNextStep}>
          {currentStep < TOTAL_STEPS ? '다음' : isEditMode ? '명함 수정하기' : '명함 완성하기'}
        </Button>
      )}
    </>
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
