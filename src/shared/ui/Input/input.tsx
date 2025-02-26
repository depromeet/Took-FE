/** 공통 컴포넌트 - input
  사용 방법 : 
  <Input label={label} placeholder={플레이스홀더} info?={input창 밑 설명글}/>
*/

import React from 'react';

import { InputBody } from './inputBody';
import { InputLabel } from './inputLabel';

type WrappedInputPropsType = {
  label: string;
  placeholder: string;
  info?: string;
};

function WrappedInput({ label, placeholder, info }: WrappedInputPropsType) {
  return (
    <div className="flex w-11/12 flex-col items-start justify-center gap-1">
      <InputLabel>{label}</InputLabel>
      <InputBody placeholder={placeholder}></InputBody>
      {info && <p className="text-xs text-gray-400">{info}</p>}{' '}
    </div>
  );
}

export default WrappedInput;
