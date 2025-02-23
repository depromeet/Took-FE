/* 공통 컴포넌트 - input
  사용 방법 : 
  <Input htmlFor={label의 htmlFor}, label={label} type={inputType}, id={id}, placeholder={플레이스홀더} />
*/

import React from 'react';

import { InputBody } from './inputBody';
import { InputLabel } from './inputLabel';

type inputPropsType = {
  label: string;
  placeholder: string;
};

function Input({ label, placeholder }: inputPropsType) {
  return (
    <div className="flex w-11/12 flex-col items-start justify-center gap-1">
      <InputLabel>{label}</InputLabel>
      <InputBody placeholder={placeholder}></InputBody>
    </div>
  );
}

export default Input;
