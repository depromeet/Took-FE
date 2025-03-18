'use client';

import React, { forwardRef, useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { InputBodyProps, inputVariants } from './input';

type WrappedTagInputPropsType = React.ComponentPropsWithoutRef<'input'> & {
  variant?: 'default' | 'withBtn';
  title?: string;
};

const WrappedTagInput = forwardRef<HTMLInputElement, WrappedTagInputPropsType>(
  ({ variant = 'default', title, ...props }, ref) => {
    const [tags, setTags] = useState<string[]>([]); // 태그 목록
    const [inputValue, setInputValue] = useState(''); // 현재 입력 중인 값

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
          setTags((prevTags) => [...prevTags, trimmedValue]);
          setInputValue(''); // 태그 추가 후 인풋 초기화
        }
      }
    };

    const handleRemoveTag = (tag: string) => {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    return (
      <div className="relative flex flex-col items-start justify-center">
        {title && <p className="text-body-5 text-gray-100">{title}</p>}

        {/* 태그 목록을 인풋 필드 안에 렌더링 */}
        <div className="relative flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div key={index} className="absolute left-3 top-1 flex items-center rounded-lg bg-gray-200 px-2 py-1">
              <span className="text-body-5 text-gray-700">{tag}</span>
              <span className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemoveTag(tag)}>
                x
              </span>
            </div>
          ))}
        </div>

        {/* 입력 필드 */}
        <TagInputBody
          ref={ref}
          variant={variant}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  },
);

const TagInputBody = React.forwardRef<HTMLInputElement, InputBodyProps>(
  ({ className, variant, type, value, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  },
);

WrappedTagInput.displayName = 'WrappedTagInput';
TagInputBody.displayName = 'TagInputBody';

export default WrappedTagInput;
