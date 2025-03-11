'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';

import { cn } from '../lib/utils';
import { spacingStyles } from '../spacing';

import { Label } from './label';
import Tag from './tag/tag';

type TagInputProps = {
  placeholder?: string;
  title?: string;
  errorMsg?: string;
  value?: string[]; // 외부 제어를 위한 값
  onChange?: (value: string[]) => void; // 외부 제어를 위한 변경 핸들러
};

/**
 * TagInput 컴포넌트의 Props입니다.
 *
 * @typedef {Object} TagInputProps
 * @property {string} [placeholder] - 입력 필드의 플레이스홀더 텍스트.
 * @property {string} [title] - 입력 필드의 제목 또는 라벨.
 * @property {string} [errorMsg] - 유효성 검사 실패 시 표시할 오류 메시지.
 * @property {string[]} [value] - 태그를 나타내는 입력의 제어 값.
 * @property {(value: string[]) => void} [onChange] - 태그 변경을 처리하는 콜백 함수.
 *
 * @description
 *
 * * Example:
 *  <TagInput
 *   placeholder="태그를 입력하세요"
 *   title="태그 입력"
 *   errorMsg="태그를 입력해주세요"
 *   value={["태그1", "태그2"]}
 *   onChange={(newTags) => console.log(newTags)}
 *  />
 */

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ title, placeholder, errorMsg, value, onChange, ...props }, ref) => {
    const [internalTags, setInternalTags] = useState<string[]>([]);
    const tags = value !== undefined ? value : internalTags;

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isComposing, setIsComposing] = useState(false);

    // 외부에서 ref를 전달받아서 내부 ref에 연결
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
      }
    }, [ref]);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isComposing || e.nativeEvent.isComposing) return;

      if (e.key === ' ' || e.key === ',') {
        e.preventDefault();
        addTag(inputValue.trim());
      } else if (e.key === 'Backspace' && inputValue === '') {
        removeTag(tags[tags.length - 1]);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        addTag(inputValue.trim());
      }
    };

    const addTag = (tag: string) => {
      if (tag.length > 0 && !tags.includes(tag)) {
        const newTags = [...tags, tag];
        if (onChange) {
          onChange(newTags);
        } else {
          setInternalTags(newTags);
        }
      }
      setInputValue('');
    };

    const removeTag = (tagToRemove: string) => {
      const newTags = tags.filter((tag) => tag !== tagToRemove);
      if (onChange) {
        onChange(newTags);
      } else {
        setInternalTags(newTags);
      }
    };
    return (
      <div className="flex flex-col gap-[6px]">
        {title && <Label className="text-body-5 text-gray-100">{title}</Label>}
        <div
          ref={containerRef}
          className={cn(
            'inline-flex h-[44px] min-h-[44px] w-full cursor-text flex-wrap gap-2 rounded-sm bg-gray-800 text-body-5 !text-gray-100 placeholder:text-body-5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus-visible:ring-1 focus-visible:ring-gray-500',
            errorMsg && 'border border-error-medium',
            spacingStyles({ padding: 'ms' }),
          )}
          tabIndex={0}
        >
          {tags.map((tag, idx) => (
            <Tag size="create-input" key={idx} message={tag} onClose={() => removeTag(tag)} />
          ))}

          <input
            ref={inputRef}
            className="flex w-full flex-1 rounded-sm border-none bg-gray-800 text-body-5 !text-gray-100 placeholder:text-body-5 placeholder:text-gray-500 focus:outline-none focus-visible:outline-none"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
        {errorMsg && <p className="text-left text-caption-1 text-error-medium">{errorMsg}</p>}
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';

export default TagInput;
