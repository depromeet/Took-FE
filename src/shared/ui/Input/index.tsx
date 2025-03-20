'use client';

import Image from 'next/image';
import React, { forwardRef, useCallback, useState } from 'react';

import { InputBody } from './input';

type WrappedInputPropsType = React.ComponentPropsWithoutRef<'input'> & {
  variant?: 'default' | 'withBtn';
  title?: string;
  error?: boolean;
  errorMsg?: string;
  closeBtn?: boolean;
  closeBtnClick?: () => void; // 닫기 버튼 클릭 시 실행할 함수 - react hook form의 setValue를 사용하기 위함
};

/** 공통 컴포넌트 - input
 *
 * 사용 예시 :
 * <WrappedInput title="SNS" variant="withBtn" />
 *
 * @param {string} [variant='default'] - input의 스타일을 정의하는 variant. 'default' 또는 'withBtn'
 *   - 'default': 기본 스타일
 *   - 'withBtn': 닫기 버튼이 있는 스타일
 * @param {string} [title] - input창의 타이틀
 *
 * @returns {JSX.Element} - WrappedInput 컴포넌트
 */

const WrappedInput = forwardRef<HTMLInputElement, WrappedInputPropsType>(
  ({ variant = 'default', error, closeBtn, errorMsg, title, onBlur, closeBtnClick, ...props }, ref) => {
    const { onChange, value: hookValue } = props; // react-hook-form의 Controller로부터 전달받은 props

    const isControlled = hookValue !== undefined;
    const [internalValue, setInternalValue] = useState('');
    const value = isControlled ? hookValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleClearInput = useCallback(() => {
      if (!isControlled) {
        setInternalValue('');
      } else if (onChange) {
        closeBtnClick && closeBtnClick();
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    }, [closeBtnClick, isControlled, onChange]);

    const renderTitle = () => {
      if (!title) return null;
      if (variant === 'withBtn') {
        return (
          <div className="flex w-full justify-between">
            <p className="text-body-5 text-gray-100">{title}</p>
          </div>
        );
      }
      return <p className="text-body-5 text-gray-100">{title}</p>;
    };

    return (
      <div className="relative flex flex-col items-start justify-center gap-[6px]">
        {renderTitle()}
        <div className="relative flex w-full flex-wrap items-center">
          <InputBody
            error={error}
            variant={variant}
            value={value}
            onChange={handleChange}
            ref={ref}
            onBlur={onBlur}
            {...props}
          />
          {closeBtn && (
            <Image
              src="/icons/deleteIcon.svg"
              alt="삭제 아이콘"
              width={16}
              height={16}
              className={`absolute right-3 ${title && 'bottom-[14.5px]'} h-4 w-4 cursor-pointer`}
              onClick={handleClearInput}
            />
          )}
        </div>
        {errorMsg && <p className="text-left text-caption-1 text-error-medium">{errorMsg}</p>}
      </div>
    );
  },
);

WrappedInput.displayName = 'WrappedInput';

export default WrappedInput;
