/** 공통 컴포넌트 - input
 *
 * 사용 예시 :
 * <WrappedInput title="SNS" variant="withBtn" placeholder="close icon 테스트 중이에요" hasTitle={true} />
 *
 * @param {string} [variant='default'] - input의 스타일을 정의하는 variant. 'default' 또는 'withBtn'
 *   - 'default': 기본 스타일
 *   - 'withBtn': 닫기 버튼이 있는 스타일
 * @param {string} placeholder - input창의 플레이스홀더 텍스트
 * @param {boolean} [hasTitle=false] - 제목을 표시할지 여부
 * @param {string} [title] - input창의 타이틀 `hasTitle`이 true일 때만 나타남
 *
 * @returns {JSX.Element} - WrappedInput 컴포넌트
 */

'use client';
import Image from 'next/image';
import React from 'react';

import deleteIcon from '../icon/deleteIcon.svg';

import { InputBody } from './input';

type WrappedInputPropsType = {
  variant?: 'default' | 'withBtn';
  placeholder: string;
  hasTitle?: boolean;
  title?: string;
};

function WrappedInput({ variant = 'default', placeholder, hasTitle, title }: WrappedInputPropsType) {
  const [value, setValue] = React.useState('');

  const handleClearInput = () => {
    setValue('');
  };

  return (
    <div className="relative flex w-11/12 flex-col items-start justify-center gap-1">
      {hasTitle && variant == 'withBtn' ? (
        <div className="flex w-full justify-between">
          <p className="text-body-5 text-gray-100">{title}</p>
          <p className="text-caption-1 text-gray-200">추가</p>
        </div>
      ) : hasTitle ? (
        <p className="text-body-5 text-gray-100">{title}</p>
      ) : null}
      <InputBody
        variant={variant}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></InputBody>
      {variant == 'withBtn' && (
        <Image
          src={deleteIcon}
          alt="삭제 아이콘"
          className={`absolute right-3 ${hasTitle && 'bottom-[14.5px]'} h-4 w-4 cursor-pointer`}
          onClick={handleClearInput}
        />
      )}{' '}
    </div>
  );
}

export default WrappedInput;
