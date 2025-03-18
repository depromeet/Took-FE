import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import { FieldArrayWithId, Noop, RefCallBack, UseFieldArrayUpdate } from 'react-hook-form';

import WrappedInput from '@/shared/ui/Input';

import { MAXIMUM_ADD } from '../config';
import { getPlatformFromUrl } from '../utils';

import CardView from './Cardview';

type FieldData = {
  id: string;
  link: string;
  type?: string;
  title?: string;
  imageUrl?: string;
  description?: string;
};

type FieldProps = {
  onChange: (...event: any[]) => void;
  value: string;
  disabled?: boolean;
  name: string;
  ref: RefCallBack;
};

type EditableCardFieldProps = {
  placeholder: string;
  index: number;
  field: FieldData;
  fields: FieldArrayWithId[];
  fieldProps: FieldProps;
  fieldOnBlur: Noop;
  fieldAppend: Noop;
  error?: string;
  editingStates: boolean[];
  setEditingState: (index: number, state: boolean) => void;
  removeField: (index: number) => void;
  updateField: UseFieldArrayUpdate<any>;
};

const EditableCardField = ({
  placeholder,
  index,
  field,
  fields,
  fieldAppend,
  fieldProps,
  error,
  fieldOnBlur,
  editingStates,
  setEditingState,
  removeField,
  updateField,
}: EditableCardFieldProps) => {
  const { value } = fieldProps;

  // 링크로부터 플랫폼을 추출하여 타이틀로 사용 - link
  const parseLinkToTitle = getPlatformFromUrl(value);

  // 편집 모드 활성화
  const enableEditing = () => {
    setEditingState(index, true);
  };

  // 편집 모드 비활성화
  const disableEditing = () => {
    setEditingState(index, false);
  };

  // 포커스를 잃었을 때
  const handleBlur = () => {
    fieldOnBlur();
    updateField(index, {
      ...field,
      type: parseLinkToTitle.toUpperCase(),
      link: value,
    });
    disableEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter key
    /**
     * 현재는 Enter키만 지원하지만 추후 다른 키도 지원할 수 있도록 수정 가능
     */
    if (e.key === 'Enter') {
      e.preventDefault();
      enableEditing();
    }
  };

  return (
    <div className="flex flex-col gap-[6px]">
      {index === 0 && (
        <div className="flex items-center justify-between">
          <Label className="text-body-5 text-gray-100">{placeholder}</Label>
          {fields.length < MAXIMUM_ADD && (
            <p className="cursor-pointer text-caption-1 text-gray-200" onClick={fieldAppend}>
              추가
            </p>
          )}
        </div>
      )}
      {!error && value && !editingStates[index] ? (
        <EditableCardEditView
          title={parseLinkToTitle}
          link={value}
          index={index}
          removeField={removeField}
          enableEditing={enableEditing}
        />
      ) : (
        <EditableCardInputView
          placeholder={placeholder}
          error={error}
          index={index}
          fieldProps={fieldProps}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          removeField={removeField}
        />
      )}
    </div>
  );
};

type EditableCardInputViewProps = {
  placeholder: string;
  index: number;
  fieldProps: FieldProps;
  error?: string;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeField: (index: number) => void;
};

// 카드 입력 모드
const EditableCardInputView = memo(
  ({ placeholder, error, index, fieldProps, onBlur, onKeyDown, removeField }: EditableCardInputViewProps) => (
    <WrappedInput
      placeholder={placeholder}
      errorMsg={error}
      error={!!error}
      onBlur={onBlur}
      closeBtn={index !== 0}
      closeBtnClick={() => removeField(index)}
      onKeyDown={onKeyDown}
      variant={index === 0 ? 'withBtn' : 'default'}
      {...fieldProps}
    />
  ),
);

EditableCardInputView.displayName = 'EditableCardInputView';

type EditableCardEditViewProps = {
  index: number;
  removeField: (index: number) => void;
  title: string;
  link: string;
  enableEditing: () => void;
};

// 카드 편집 모드
const EditableCardEditView = memo(({ index, title, link, removeField, enableEditing }: EditableCardEditViewProps) => (
  <CardView index={index} title={title} link={link} onCloseClick={() => removeField(index)} onClick={enableEditing} />
));

EditableCardEditView.displayName = 'EditableCardEditView';

export default EditableCardField;
