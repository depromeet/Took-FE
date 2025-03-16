'use client';

import { Label } from '@radix-ui/react-label';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { CAREER_FORM, FIELD_TAG_MAPPING, MAXIMUM_ADD } from '@/features/multi-step-form/config';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import WrappedInput from '@/shared/ui/Input';

import CardView from '../../components/Cardview';
import { useEditingStates } from '../../hooks/useEditingStates';
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
  const {
    editingStates: snsEditingStates,
    setEditingState: setSnsEditingState,
    removeEditingState: removeSnsEditingState,
    addEditingState: addSnsEditingState,
  } = useEditingStates(snsFields);

  // 작성한 글 상태 관리
  const {
    editingStates: contentsEditingStates,
    setEditingState: setContentsEditingStates,
    removeEditingState: removeContentsEditingState,
    addEditingState: addContentsEditingState,
  } = useEditingStates(contentsFields);

  // 프로젝트 상태 관리
  const {
    editingStates: projectEditingStates,
    setEditingState: setProjectEditingStates,
    removeEditingState: removeProjectEditingState,
    addEditingState: addProjectEditingState,
  } = useEditingStates(projectFields);

  // secondStep에서 선택한 태그를 가져옴
  const [selectedTags] = useCardFormStore(useShallow((state) => [state.tagArray]));

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
          {selectedTags.includes(FIELD_TAG_MAPPING.organization) && (
            <Controller
              control={control}
              name="organization"
              render={({ field }) => (
                <WrappedInput
                  title="소속 정보"
                  placeholder="소속 정보를 입력해주세요."
                  errorMsg={errors.organization?.message}
                  error={!!errors.organization?.message}
                  {...field}
                />
              )}
            />
          )}

          {selectedTags.includes(FIELD_TAG_MAPPING.sns) &&
            snsFields.map((field, idx) => (
              <Controller
                key={field.id}
                control={control}
                name={`sns.${idx}.link`}
                render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                  const handleBlur = () => {
                    fieldOnBlur();
                    setSnsEditingState(idx, false);
                  };

                  const parseLink = extractDomainUsingRegex(fieldProps.value);

                  const CardEditView = () => (
                    <CardView
                      title={parseLink}
                      link={fieldProps.value}
                      onCloseClick={() => {
                        snsRemove(idx);
                        removeSnsEditingState(idx);
                      }}
                      onClick={() => setSnsEditingState(idx, true)}
                    />
                  );

                  const InputView = () => (
                    <WrappedInput
                      placeholder="SNS 주소를 입력해주세요."
                      errorMsg={errors.sns?.[idx]?.link?.message}
                      error={!!errors.sns?.[idx]?.link?.message}
                      onBlur={handleBlur}
                      closeBtn={idx !== 0}
                      closeBtnClick={() => {
                        snsRemove(idx);
                        removeSnsEditingState(idx);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setSnsEditingState(idx, false);
                        }
                      }}
                      variant={idx === 0 ? 'withBtn' : 'default'}
                      {...fieldProps}
                    />
                  );

                  const handleAddClick = () => {
                    snsAppend({ type: '', link: '' });
                    addSnsEditingState();
                  };

                  return (
                    <div className="flex flex-col gap-[6px]" key={field.id}>
                      {idx === 0 && (
                        <div className="flex items-center justify-between">
                          <Label className="text-body-5 text-gray-100">SNS</Label>
                          {snsFields.length < MAXIMUM_ADD && (
                            <p className="cursor-pointer text-caption-1 text-gray-200" onClick={handleAddClick}>
                              추가
                            </p>
                          )}
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

          {selectedTags.includes(FIELD_TAG_MAPPING.region) && (
            <Controller
              control={control}
              name="region"
              render={({ field }) => (
                <WrappedInput
                  title="활동 지역"
                  placeholder="주로 활동하는 지역을 입력해 주세요."
                  errorMsg={errors.region?.message}
                  error={!!errors.region?.message}
                  {...field}
                />
              )}
            />
          )}

          {selectedTags.includes(FIELD_TAG_MAPPING.hobby) && (
            <Controller
              control={control}
              name="hobby"
              render={({ field }) => (
                <WrappedInput
                  title="취미"
                  placeholder="대화의 시작이 될 수 있는 관심사를 입력해 보세요."
                  errorMsg={errors.hobby?.message}
                  error={!!errors.hobby?.message}
                  {...field}
                />
              )}
            />
          )}

          {selectedTags.includes(FIELD_TAG_MAPPING.news) && (
            <Controller
              control={control}
              name="news"
              render={({ field }) => (
                <WrappedInput
                  title="최근 소식"
                  placeholder="직무,프로젝트,커리어 변화 소식을 공유해보세요."
                  errorMsg={errors.news?.message}
                  error={!!errors.news?.message}
                  {...field}
                />
              )}
            />
          )}

          {selectedTags.includes(FIELD_TAG_MAPPING.content) &&
            contentsFields.map((field, idx) => (
              <Controller
                key={field.id}
                control={control}
                name={`content.${idx}.link`}
                render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                  const handleBlur = () => {
                    fieldOnBlur();
                    setContentsEditingStates(idx, false);
                  };

                  const parseLink = extractDomainUsingRegex(fieldProps.value);

                  const CardEditView = () => (
                    <CardView
                      title={parseLink}
                      link={fieldProps.value}
                      onCloseClick={() => {
                        contentRemove(idx);
                        removeContentsEditingState(idx);
                      }}
                      onClick={() => setContentsEditingStates(idx, true)}
                    />
                  );

                  const InputView = () => (
                    <WrappedInput
                      placeholder="작성한 글을 입력해주세요."
                      errorMsg={errors.content?.[idx]?.message}
                      error={!!errors.content?.[idx]?.message}
                      closeBtn={idx !== 0}
                      closeBtnClick={() => {
                        contentRemove(idx);
                        removeContentsEditingState(idx);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setContentsEditingStates(idx, false);
                        }
                      }}
                      onBlur={handleBlur}
                      variant={idx === 0 ? 'withBtn' : 'default'}
                      {...fieldProps}
                    />
                  );

                  const handleAddClick = () => {
                    contentAppend({ type: 'blog', link: '', title: '', imageUrl: '', description: '' });
                    addContentsEditingState();
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

          {selectedTags.includes(FIELD_TAG_MAPPING.project) &&
            projectFields.map((field, idx) => (
              <Controller
                key={field.id}
                control={control}
                name={`project.${idx}.link`}
                render={({ field: { onBlur: fieldOnBlur, ...fieldProps } }) => {
                  const handleBlur = () => {
                    fieldOnBlur();
                    setProjectEditingStates(idx, false);
                  };

                  const parseLink = extractDomainUsingRegex(fieldProps.value);

                  const CardEditView = () => (
                    <CardView
                      title={parseLink}
                      link={fieldProps.value}
                      onCloseClick={() => {
                        projectRemove(idx);
                        removeProjectEditingState(idx);
                      }}
                      onClick={() => setProjectEditingStates(idx, true)}
                    />
                  );

                  const InputView = () => (
                    <WrappedInput
                      placeholder="대표 프로젝트를 입력해주세요."
                      errorMsg={errors.project?.[idx]?.link?.message}
                      error={!!errors.project?.[idx]?.link?.message}
                      closeBtn={idx !== 0}
                      closeBtnClick={() => {
                        projectRemove(idx);
                        removeProjectEditingState(idx);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setProjectEditingStates(idx, false);
                        }
                      }}
                      onBlur={handleBlur}
                      variant={idx === 0 ? 'withBtn' : 'default'}
                      {...fieldProps}
                    />
                  );

                  const handleAddClick = () => {
                    projectAppend({ type: 'project', link: '', title: '', imageUrl: '', description: '' });
                    addProjectEditingState();
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
