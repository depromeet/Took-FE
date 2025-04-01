'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { CAREER_FORM } from '@/features/multi-step-form/config';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import WrappedInput from '@/shared/ui/Input';

import EditableCardField from '../../components/EditableCardField';
import { useEditingStates } from '../../hooks/useEditingStates';
import { CareerFormData } from '../../schema';

import { FIELD_TAG_MAPPING } from './config';

function ThirdStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CareerFormData>();

  const {
    fields: contentsFields,
    append: contentAppend,
    remove: contentRemove,
    update: contentUpdate,
  } = useFieldArray({
    control,
    name: 'content',
  });

  const {
    fields: snsFields,
    append: snsAppend,
    remove: snsRemove,
    update: snsUpdate,
  } = useFieldArray({
    control,
    name: 'sns',
  });

  const {
    fields: projectFields,
    append: projectAppend,
    remove: projectRemove,
    update: projectUpdate,
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
  const selectedTags = useCardFormStore(useShallow((state) => state.tagArray));

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
                  placeholder="소속 정보를 입력해 주세요."
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
                  // 추가 버튼 클릭 시
                  const handleFieldAppend = () => {
                    snsAppend({ type: '', link: '' });
                    addSnsEditingState();
                  };

                  const handleFieldRemove = (idx: number) => {
                    snsRemove(idx);
                    removeSnsEditingState(idx);
                  };

                  return (
                    <EditableCardField
                      index={idx}
                      title="SNS"
                      placeholder="SNS 주소를 입력해 주세요."
                      field={field}
                      fields={snsFields}
                      fieldAppend={handleFieldAppend}
                      updateField={snsUpdate}
                      fieldProps={fieldProps}
                      fieldOnBlur={fieldOnBlur}
                      error={errors.sns?.[idx]?.link?.message}
                      removeField={handleFieldRemove}
                      editingStates={snsEditingStates}
                      setEditingState={setSnsEditingState}
                    />
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
                  const handleFieldAppend = () => {
                    contentAppend({ type: 'blog', link: '', title: '', imageUrl: '', description: '' });
                    addContentsEditingState();
                  };

                  const handleFieldRemove = (idx: number) => {
                    contentRemove(idx);
                    removeContentsEditingState(idx);
                  };

                  return (
                    <EditableCardField
                      index={idx}
                      title="작성한 글"
                      placeholder="작성한 글을 입력해 주세요."
                      field={field}
                      fields={contentsFields}
                      fieldAppend={handleFieldAppend}
                      updateField={contentUpdate}
                      fieldProps={fieldProps}
                      fieldOnBlur={fieldOnBlur}
                      error={errors.sns?.[idx]?.link?.message}
                      removeField={handleFieldRemove}
                      editingStates={contentsEditingStates}
                      setEditingState={setContentsEditingStates}
                    />
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
                  const handleAddClick = () => {
                    projectAppend({
                      type: 'project',
                      link: '',
                      title: '',
                      imageUrl: '',
                      description: '',
                    });
                    addProjectEditingState();
                  };

                  const handleFieldRemove = (idx: number) => {
                    projectRemove(idx);
                    removeProjectEditingState(idx);
                  };

                  return (
                    <EditableCardField
                      index={idx}
                      title="대표 프로젝트"
                      placeholder="대표 프로젝트를 입력해 주세요."
                      field={field}
                      fields={projectFields}
                      fieldAppend={handleAddClick}
                      updateField={projectUpdate}
                      fieldProps={fieldProps}
                      fieldOnBlur={fieldOnBlur}
                      error={errors.project?.[idx]?.link?.message}
                      removeField={handleFieldRemove}
                      editingStates={projectEditingStates}
                      setEditingState={setProjectEditingStates}
                    />
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
