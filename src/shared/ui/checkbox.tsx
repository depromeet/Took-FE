'use client';

import { ChangeEvent, forwardRef, useState, createContext, useContext, useEffect, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
};

/**
 * @description 체크박스 컴포넌트
 * @component Checkbox
 * @example
 * ```tsx
 * <Checkbox checked={isChecked} onChange={setIsChecked} />
 * ```
 *
 * @property {boolean} checked - 체크박스의 체크 상태
 * @property {boolean} defaultChecked - 초기 체크 상태
 * @property {(checked: boolean) => void} onChange - 체크 상태 변경 시 호출되는 콜백
 * @property {string} className - 추가 스타일 클래스
 * @property {boolean} disabled - 비활성화 여부
 * @property {string} id - 체크박스의 id
 * @property {string} name - 체크박스의 name
 * @property {string} value - 체크박스의 값
 */

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, defaultChecked, onChange, className, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(defaultChecked || false);

    // checked prop이 제공되면 제어 컴포넌트로 동작
    const checkedState = checked !== undefined ? checked : isChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      // 제어되지 않는 컴포넌트인 경우에만 내부 상태 업데이트
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    return (
      <div className={cn('inline-flex items-center', className)}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checkedState}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            'relative flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-sm',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={() => {
            if (!disabled && checked === undefined) {
              setIsChecked(!isChecked);
              onChange?.(!isChecked);
            }
          }}
        >
          {checkedState ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

// 체크박스 그룹 관련 코드 추가
type CheckboxGroupContextProps = {
  values: string[];
  onChange: (value: string, checked: boolean) => void;
  disabled?: boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextProps | undefined>(undefined);

export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error('useCheckboxGroup must be used within a CheckboxGroup');
  }
  return context;
};

type CheckboxGroupProps = {
  children: ReactNode;
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
  disabled?: boolean;
};

export const CheckboxGroup = ({ children, values, onChange, className, disabled }: CheckboxGroupProps) => {
  const handleItemChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <CheckboxGroupContext.Provider value={{ values, onChange: handleItemChange, disabled }}>
      <div className={cn('flex flex-col space-y-2', className)}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
};

// 그룹 내에서 사용할 체크박스 아이템
type CheckboxItemProps = Omit<CheckboxProps, 'checked' | 'onChange'> & {
  value: string;
  label?: ReactNode;
};

export const CheckboxItem = forwardRef<HTMLInputElement, CheckboxItemProps>(
  ({ value, label, className, ...props }, ref) => {
    const { values, onChange, disabled: groupDisabled } = useCheckboxGroup();
    const isChecked = values.includes(value);

    return (
      <label
        className={cn('flex cursor-pointer items-center gap-2', props.disabled && 'cursor-not-allowed', className)}
      >
        <Checkbox
          checked={isChecked}
          onChange={(checked) => onChange(value, checked)}
          disabled={groupDisabled || props.disabled}
          ref={ref}
          {...props}
        />
        {label}
      </label>
    );
  },
);

CheckboxItem.displayName = 'CheckboxItem';

// 모든 체크박스를 제어하는 상위 체크박스
type CheckboxGroupHeaderProps = Omit<CheckboxProps, 'checked' | 'onChange'> & {
  label?: ReactNode;
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
  className?: string;
};

export const CheckboxGroupHeader = forwardRef<HTMLInputElement, CheckboxGroupHeaderProps>(
  ({ label, values, options, onChange, className, ...props }, ref) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const isChecked = values.length === options.length && options.length > 0;

    // 모든 체크박스를 선택하거나 해제
    const handleChange = (checked: boolean) => {
      onChange(checked ? [...options] : []);
    };

    // 전체/부분 선택 상태 업데이트
    useEffect(() => {
      setIndeterminate(values.length > 0 && values.length < options.length);
    }, [values, options]);

    return (
      <label className={cn('flex items-center gap-2 font-medium', props.disabled && 'cursor-not-allowed', className)}>
        <div className="inline-flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={(e) => handleChange(e.target.checked)}
            disabled={props.disabled}
            ref={(inputElement) => {
              if (inputElement) {
                inputElement.indeterminate = indeterminate;
              }
              if (typeof ref === 'function') {
                ref(inputElement);
              } else if (ref) {
                ref.current = inputElement;
              }
            }}
            {...props}
          />
          <div
            className={cn(
              'relative flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-sm',
              props.disabled && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => {
              if (!props.disabled) {
                handleChange(!isChecked);
              }
            }}
          >
            {indeterminate ? <IndeterminateIcon /> : isChecked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
          </div>
        </div>
        {label}
      </label>
    );
  },
);

CheckboxGroupHeader.displayName = 'CheckboxGroupHeader';

type CheckboxIconProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const CheckboxIcon = ({ className, width = 24, height = 24 }: CheckboxIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z"
        fill="#41425D"
      />
    </svg>
  );
};

type CheckboxCheckedIconProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const CheckboxCheckedIcon = ({ className, width = 24, height = 24 }: CheckboxCheckedIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z"
        fill="#6535FF"
      />
      <path d="M8 12.6L11 15L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// 부분 선택 상태일 때의 아이콘
export const IndeterminateIcon = ({ className, width = 24, height = 24 }: CheckboxIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z"
        fill="#6535FF"
      />
      <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export { Checkbox };
