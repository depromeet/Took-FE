import { memo } from 'react';
import { FieldArrayWithId, Noop, RefCallBack, UseFieldArrayUpdate } from 'react-hook-form';

import WrappedInput from '@/shared/ui/Input';
import { Label } from '@/shared/ui/label';

import { MAXIMUM_TAG_ADD } from '../config';
import { useScrap } from '../hooks/queries/useScrap';
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
  title: string;
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

/**
 * `EditableCardField` 컴포넌트는 사용자가 입력한 링크를 기반으로 플랫폼을 추출하고,
 * 편집 모드를 활성화/비활성화하며, 스크래핑을 통해 링크의 메타 데이터를 가져와 필드를 업데이트합니다.
 *
 * @param {EditableCardFieldProps} props - 컴포넌트에 전달되는 props
 * @param {string} props.title - 필드의 제목
 * @param {string} props.placeholder - 입력 필드의 플레이스홀더
 * @param {number} props.index - 필드의 인덱스
 * @param {object} props.field - 현재 필드의 데이터
 * @param {Array} props.fields - 모든 필드의 배열
 * @param {Function} props.fieldAppend - 필드를 추가하는 함수
 * @param {object} props.fieldProps - 필드의 속성
 * @param {boolean} props.error - 에러 상태
 * @param {Function} props.fieldOnBlur - 필드가 포커스를 잃었을 때 호출되는 함수
 * @param {Array} props.editingStates - 각 필드의 편집 상태 배열
 * @param {Function} props.setEditingState - 편집 상태를 설정하는 함수
 * @param {Function} props.removeField - 필드를 제거하는 함수
 * @param {Function} props.updateField - 필드를 업데이트하는 함수
 *
 * @returns {JSX.Element} - `EditableCardField` 컴포넌트
 */

const EditableCardField = ({
  title,
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
  const { mutateAsync: scapAPI } = useScrap();

  const { value, name } = fieldProps;
  const targetFieldName = name.split('.')[0];

  // 링크로부터 플랫폼을 추출하여 타이틀로 사용 - link
  const parseLinkToTitle = getPlatformFromUrl(value);

  const platformInputType = targetFieldName === 'content' ? 'BLOG' : 'PROJECT';

  // 편집 모드 활성화
  const enableEditing = () => {
    setEditingState(index, true);
  };

  // 편집 모드 비활성화
  const disableEditing = () => {
    setEditingState(index, false);
  };

  // 스크래핑 함수
  const handleScrap = async () => {
    try {
      const { data } = await scapAPI({
        payload: { link: value },
        type: platformInputType,
      });
      const { title, imageUrl, description } = data;
      // 중요: 스크래핑 서버가 반환한 link가 아닌 사용자가 입력한 원본 URL(value)을 계속 사용

      // 원본 URL 유지하면서 다른 스크래핑 결과만 적용
      updateField(index, {
        ...field, // 기존에 가지고 있던 다른 필드가 있으면 유지
        link: value, // 사용자가 입력한 원본 URL 유지
        type: platformInputType.toLowerCase(),
        title,
        imageUrl,
        description,
      });
    } catch (error) {
      // 오류 발생 시에도 플랫폼 타입과 원본 URL 유지
      const platformType = getPlatformFromUrl(value).toUpperCase();

      updateField(index, {
        ...field,
        link: value,
        type: platformInputType.toLowerCase(),
        title: platformType !== 'LINK' ? platformType : parseLinkToTitle,
        imageUrl: '',
        description: '',
      });
    }
  };

  // 포커스를 잃었을 때
  const handleBlur = () => {
    fieldOnBlur();

    const scapingTargetArr = ['content', 'project'];

    if (scapingTargetArr.includes(targetFieldName) && value) {
      // 플랫폼 타입 미리 설정 (스크래핑 과정에서 URL이 변경되어도 원본 플랫폼 인식 유지)
      updateField(index, {
        ...field,
        type: platformInputType.toLowerCase(),
        link: value,
      });

      // 스크래핑 실행 - 메타데이터만 가져오고 link는 보존됨
      handleScrap();
    } else {
      updateField(index, {
        ...field,
        type: 'ETC',
        link: value,
      });
    }

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
          <Label className="text-body-5 text-gray-100">{title}</Label>
          {fields.length < MAXIMUM_TAG_ADD && (
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
