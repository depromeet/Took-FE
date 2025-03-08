'use client';

import Image from 'next/image';
import React, { forwardRef, useCallback, useState } from 'react';

import { InputBody } from './input';

type WrappedInputPropsType = React.ComponentPropsWithoutRef<'input'> & {
  variant?: 'default' | 'withBtn';
  title?: string;
  error?: boolean;
  errorMsg?: string;
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
  ({ variant = 'default', error, errorMsg, title, ...props }, ref) => {
    const [value, setValue] = useState('');

    const handleClearInput = useCallback(() => {
      setValue('');
    }, []);

    const renderTitle = () => {
      if (!title) return null;
      if (variant === 'withBtn') {
        return (
          <div className="flex w-full justify-between">
            <p className="text-body-5 text-gray-100">{title}</p>
            <p className="text-caption-1 text-gray-200">추가</p>
          </div>
        );
      }
      return <p className="text-body-5 text-gray-100">{title}</p>;
    };

    return (
      <div className="relative flex flex-col items-start justify-center gap-[6px]">
        {renderTitle()}
        <InputBody
          error={error}
          variant={variant}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={ref}
          {...props}
        />
        {variant === 'withBtn' && (
          <Image
            src="/icons/deleteIcon.svg"
            alt="삭제 아이콘"
            width={16}
            height={16}
            className={`absolute right-3 ${title && 'bottom-[14.5px]'} h-4 w-4 cursor-pointer`}
            onClick={handleClearInput}
          />
        )}
        {errorMsg && <p className="text-left text-caption-1 text-error-medium">{errorMsg}</p>}
      </div>
    );
  },
);

WrappedInput.displayName = 'WrappedInput';

export default WrappedInput;
