'use client';

import { useEffect, useState } from 'react';
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

  // 로컬 상태로 selectedTags를 관리
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>([]);

  // secondStep에서 선택한 태그를 가져옴
  const selectedTags = useCardFormStore(useShallow((state) => state.tagArray));

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

  // selectedTags가 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    setLocalSelectedTags(selectedTags);

    // 선택되지 않은 필드 초기화
    if (!selectedTags.includes(FIELD_TAG_MAPPING.content) && contentsFields.length > 0) {
      // content 필드 초기화
      contentRemove(Array.from({ length: contentsFields.length }, (_, i) => i));
    }

    if (!selectedTags.includes(FIELD_TAG_MAPPING.project) && projectFields.length > 0) {
      // project 필드 초기화
      projectRemove(Array.from({ length: projectFields.length }, (_, i) => i));
    }

    if (!selectedTags.includes(FIELD_TAG_MAPPING.sns) && snsFields.length > 0) {
      // sns 필드 초기화
      snsRemove(Array.from({ length: snsFields.length }, (_, i) => i));
    }

    // 선택된 필드에 항목이 없으면 기본값 추가
    if (selectedTags.includes(FIELD_TAG_MAPPING.content) && contentsFields.length === 0) {
      contentAppend({ type: 'blog', link: '', title: '', imageUrl: '', description: '' });
    }

    if (selectedTags.includes(FIELD_TAG_MAPPING.project) && projectFields.length === 0) {
      projectAppend({ type: 'project', link: '', title: '', imageUrl: '', description: '' });
    }

    if (selectedTags.includes(FIELD_TAG_MAPPING.sns) && snsFields.length === 0) {
      snsAppend({ type: '', link: '' });
    }
  }, [
    selectedTags,
    contentAppend,
    contentRemove,
    projectAppend,
    projectRemove,
    snsAppend,
    snsRemove,
    contentsFields.length,
    projectFields.length,
    snsFields.length,
  ]);

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
          {localSelectedTags.includes(FIELD_TAG_MAPPING.organization) && (
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.sns) &&
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.region) && (
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.hobby) && (
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.news) && (
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.content) &&
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

          {localSelectedTags.includes(FIELD_TAG_MAPPING.project) &&
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
