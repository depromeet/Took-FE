'use client';

import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { CAREER_FORM, MAXIMUM_ADD } from '@/features/multi-step-form/config';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedInput from '@/shared/ui/Input';

import CardView from '../../components/Cardview';
import { CareerFormData } from '../../schema';
import { extractDomainUsingRegex } from '../../utils';

function ThirdStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormData>();

  const {
    fields: contentsFields,
    append: contentAppend,
    remove: contentRemove,
  } = useFieldArray({
    control,
    name: 'content',
  });

  const {
    fields: snsFields,
    append: snsAppend,
    remove: snsRemove,
  } = useFieldArray({
    control,
    name: 'sns',
  });

  const {
    fields: projectFields,
    append: projectAppend,
    remove: projectRemove,
  } = useFieldArray({
    control,
    name: 'project',
  });

  // SNS 입력 상태 관리
  const [snsEditingStates, setSnsEditingStates] = useState<boolean[]>(snsFields.map(() => true));

  // 작성한 글 상태 관리
  const [contentsEditingStates, setContentsEditingStates] = useState<boolean[]>(contentsFields.map(() => true));

  // 프로젝트 상태 관리
  const [projectEditingStates, setProjectEditingStates] = useState<boolean[]>(projectFields.map(() => true));

  useEffect(() => {
    setSnsEditingStates((prevStates) => {
      const newLength = snsFields.length;
      if (newLength === prevStates.length) return prevStates;
      if (newLength > prevStates.length) {
        return [...prevStates, ...Array(newLength - prevStates.length).fill(true)];
      }
      return prevStates.slice(0, newLength);
    });
  }, [snsFields]);

  useEffect(() => {
    setContentsEditingStates((prevStates) => {
      const newLength = contentsFields.length;
      if (newLength === prevStates.length) return prevStates;
      if (newLength > prevStates.length) {
        return [...prevStates, ...Array(newLength - prevStates.length).fill(true)];
      }
      return prevStates.slice(0, newLength);
    });
  }, [contentsFields]);

  useEffect(() => {
    setProjectEditingStates((prevStates) => {
      const newLength = projectFields.length;
      if (newLength === prevStates.length) return prevStates;
      if (newLength > prevStates.length) {
        return [...prevStates, ...Array(newLength - prevStates.length).fill(true)];
      }
      return prevStates.slice(0, newLength);
    });
  }, [projectFields]);

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
            render={({ field }) => {
              return (
                <>
                  <WrappedInput
                    title="소속 정보"
                    placeholder="소속 정보를 입력해주세요."
                    errorMsg={errors.organization?.message}
                    error={!!errors.organization?.message}
                    {...field}
                  />
                </>
              );
            }}
          />
          {snsFields.map((field, idx) => (
            <Controller
              key={field.id}
              control={control}
              name={`sns.${idx}.link`}
              render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                // 카드뷰로 전환하는 핸들러
                const handleTransformToCard = () => {
                  setSnsEditingStates((prev) => {
                    const newStates = [...prev];
                    newStates[idx] = false;
                    return newStates;
                  });
                };

                // 블러 이벤트 핸들러: Controller의 onBlur와 상태 업데이트를 함께 처리
                const handleBlur = () => {
                  fieldOnBlur();
                  // 입력값이 있을 경우 카드뷰로 전환
                  handleTransformToCard();
                };

                const parseLink = extractDomainUsingRegex(fieldProps.value);

                // 카드뷰 렌더링
                const CardEditView = () => (
                  <CardView
                    title={parseLink}
                    link={fieldProps.value}
                    onCloseClick={() => {
                      snsRemove(idx);
                      setSnsEditingStates((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    // 카드뷰 클릭 시 다시 편집 모드로 전환
                    onClick={() =>
                      setSnsEditingStates((prev) => {
                        const newStates = [...prev];
                        newStates[idx] = true;
                        return newStates;
                      })
                    }
                  />
                );

                // 입력뷰 렌더링
                const InputView = () => (
                  <WrappedInput
                    placeholder="SNS 주소를 입력해주세요."
                    errorMsg={errors.sns?.[idx]?.link?.message}
                    error={!!errors.sns?.[idx]?.link?.message}
                    onBlur={handleBlur}
                    closeBtn={idx !== 0}
                    closeBtnClick={() => {
                      snsRemove(idx);
                      setSnsEditingStates((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTransformToCard();
                      }
                    }}
                    variant={idx === 0 ? 'withBtn' : 'default'}
                    {...fieldProps}
                  />
                );

                // 추가 버튼 클릭 시
                const onAddClick = () => {
                  if (snsFields.length < MAXIMUM_ADD) {
                    snsAppend({ type: '', link: '' });
                    setSnsEditingStates((prev) => [...prev, true]);
                  }
                };

                return (
                  <div className="flex flex-col gap-[6px]" key={field.id}>
                    {idx === 0 && (
                      <div className="flex items-center justify-between">
                        <Label className="text-body-5 text-gray-100">SNS</Label>
                        <p className="cursor-pointer text-caption-1 text-gray-200" onClick={onAddClick}>
                          추가
                        </p>
                      </div>
                    )}
                    {!errors.sns?.[idx]?.link?.message && fieldProps.value && !snsEditingStates[idx]
                      ? CardEditView()
                      : InputView()}
                  </div>
                );
              }}
            />
          ))}

          <Controller
            control={control}
            name="region"
            render={({ field }) => {
              return (
                <>
                  <WrappedInput
                    title="활동 지역"
                    placeholder="주로 활동하는 지역을 입력해 주세요."
                    errorMsg={errors.region?.message}
                    error={!!errors.region?.message}
                    {...field}
                  />
                </>
              );
            }}
          />
          <Controller
            control={control}
            name="hobby"
            render={({ field }) => {
              return (
                <>
                  <WrappedInput
                    title="취미"
                    placeholder="대화의 시작이 될 수 있는 관심사를 입력해 보세요."
                    errorMsg={errors.hobby?.message}
                    error={!!errors.hobby?.message}
                    {...field}
                  />
                </>
              );
            }}
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

          {contentsFields.map((field, idx) => (
            <Controller
              key={field.id}
              control={control}
              name={`content.${idx}.link`}
              render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                const handleAddClick = () => {
                  contentAppend({ type: 'blog', link: '', title: '', imageUrl: '', description: '' });
                };

                const handleTransformToCard = () => {
                  setContentsEditingStates((prev) => {
                    const newStates = [...prev];
                    newStates[idx] = false;
                    return newStates;
                  });
                };

                const handleBlur = () => {
                  fieldOnBlur();
                  handleTransformToCard();
                };

                const parseLink = extractDomainUsingRegex(fieldProps.value);

                // 카드뷰 렌더링
                const CardEditView = () => (
                  <CardView
                    title={parseLink}
                    link={fieldProps.value}
                    onCloseClick={() => {
                      snsRemove(idx);
                      setContentsEditingStates((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    // 카드뷰 클릭 시 다시 편집 모드로 전환
                    onClick={() =>
                      setContentsEditingStates((prev) => {
                        const newStates = [...prev];
                        newStates[idx] = true;
                        return newStates;
                      })
                    }
                  />
                );

                const InputView = () => {
                  return (
                    <WrappedInput
                      placeholder="작성한 글을 입력해주세요."
                      errorMsg={errors.content?.[idx]?.message}
                      error={!!errors.content?.[idx]?.message}
                      closeBtn={idx !== 0}
                      closeBtnClick={() => {
                        contentRemove(idx);
                        setContentsEditingStates((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTransformToCard();
                        }
                      }}
                      onBlur={handleBlur}
                      variant={idx === 0 ? 'withBtn' : 'default'}
                      {...fieldProps}
                    />
                  );
                };

                return (
                  <div className="flex flex-col gap-[6px]">
                    {idx === 0 && (
                      <div className="flex items-center justify-between">
                        <Label className="text-body-5 text-gray-100">작성한 글</Label>
                        {contentsFields.length < MAXIMUM_ADD && (
                          <p className="cursor-pointer text-caption-1 text-gray-200" onClick={handleAddClick}>
                            추가
                          </p>
                        )}
                      </div>
                    )}
                    {!errors.content?.[idx]?.link?.message && fieldProps.value && !contentsEditingStates[idx]
                      ? CardEditView()
                      : InputView()}
                  </div>
                );
              }}
            />
          ))}

          {/* 프로젝트 입력 */}
          {projectFields.map((field, idx) => (
            <Controller
              key={field.id}
              control={control}
              name={`project.${idx}.link`}
              render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                const handleAddClick = () => {
                  projectAppend({ type: 'project', link: '', title: '', imageUrl: '', description: '' });
                };

                const handleTransformToCard = () => {
                  setProjectEditingStates((prev) => {
                    const newStates = [...prev];
                    newStates[idx] = false;
                    return newStates;
                  });
                };

                const handleBlur = () => {
                  fieldOnBlur();
                  handleTransformToCard();
                };

                const parseLink = extractDomainUsingRegex(fieldProps.value);

                // 카드뷰 렌더링
                const CardEditView = () => (
                  <CardView
                    title={parseLink}
                    link={fieldProps.value}
                    onCloseClick={() => {
                      snsRemove(idx);
                      setProjectEditingStates((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    // 카드뷰 클릭 시 다시 편집 모드로 전환
                    onClick={() =>
                      setProjectEditingStates((prev) => {
                        const newStates = [...prev];
                        newStates[idx] = true;
                        return newStates;
                      })
                    }
                  />
                );

                const InputView = () => {
                  return (
                    <WrappedInput
                      placeholder="대표 프로젝트를 입력해주세요."
                      errorMsg={errors.project?.[idx]?.link?.message}
                      error={!!errors.project?.[idx]?.link?.message}
                      closeBtn={idx !== 0}
                      closeBtnClick={() => {
                        projectRemove(idx);
                        setProjectEditingStates((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTransformToCard();
                        }
                      }}
                      onBlur={handleBlur}
                      variant={idx === 0 ? 'withBtn' : 'default'}
                      {...fieldProps}
                    />
                  );
                };

                return (
                  <div className="flex flex-col gap-[6px]">
                    {idx === 0 && (
                      <div className="flex items-center justify-between">
                        <Label className="text-body-5 text-gray-100">대표 프로젝트</Label>
                        {projectFields.length < MAXIMUM_ADD && (
                          <p className="cursor-pointer text-caption-1 text-gray-200" onClick={handleAddClick}>
                            추가
                          </p>
                        )}
                      </div>
                    )}
                    {!errors.project?.[idx]?.link?.message && fieldProps.value && !projectEditingStates[idx]
                      ? CardEditView()
                      : InputView()}
                  </div>
                );
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ThirdStep;
