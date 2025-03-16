'use client';

import { Label } from '@radix-ui/react-label';
import { disassemble } from 'es-hangul';
import { forwardRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import Select, { FilterOptionOption, type StylesConfig, type GroupBase, Props as ReactSelectProps } from 'react-select';

// es-hangul 패키지의 disassemble 함수를 임포트

import { cn } from '@/shared/lib/utils';

export type SearchOptions = {
  id: string | number;
  value: string | number;
  label: string;
  keywords: string[];
};

type SearchDropdownProps = {
  placeholder: string;
  title?: string;
  errorMsg?: string;
  options: SearchOptions[];
};

// SearchDropdownProps와 react-select에서 사용하는 Props를 합칩니다.
type CombineSearchDropdownProps = SearchDropdownProps &
  // react-select에서 사용하는 기본 속성
  Omit<ReactSelectProps<SearchOptions, false, GroupBase<SearchOptions>>, 'value' | 'onChange'> &
  // react-hook-form에서 넘어오는 field (onChange, onBlur, ref, name, value 등)
  Partial<ControllerRenderProps<any, any>>;

const SearchDropdown = forwardRef<any, CombineSearchDropdownProps>(
  ({ title, placeholder, options, onChange, errorMsg, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[6px]">
        {title && <Label className="text-body-5 text-gray-100">{title}</Label>}
        <Select
          className={cn('', errorMsg && 'rounded-md border border-error-medium')}
          ref={ref}
          options={options}
          placeholder={placeholder}
          styles={customStyles}
          filterOption={customFilterOption}
          onChange={onChange}
          instanceId={title}
          {...props}
        />
        {errorMsg && <p className="text-left text-caption-1 text-error-medium">{errorMsg}</p>}
      </div>
    );
  },
);

SearchDropdown.displayName = 'SearchDropdown';
/**
 * es-hangul의 disassemble 함수를 활용해 한글 문자열을 분해한 후,
 * 커스텀 필터 함수에서 분해된 문자열끼리 비교합니다.
 */
const customFilterOption = (option: FilterOptionOption<SearchOptions>, rawInput: string) => {
  // 입력값과 옵션 label, keywords를 소문자로 변환 후 분해합니다.
  const input = rawInput.toLowerCase();
  const decomposedInput = disassemble(input);

  // label 비교
  const label = option.label.toLowerCase();
  const decomposedLabel = disassemble(label);
  if (decomposedLabel.includes(decomposedInput)) {
    return true;
  }

  // keywords 비교
  return option.data.keywords.some((keyword) => {
    const decomposedKeyword = disassemble(keyword.toLowerCase());
    return decomposedKeyword.includes(decomposedInput);
  });
};

const fontStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontFamily: 'Pretendard',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: '-0.28px',
};

// react-select의 커스텀 스타일
const customStyles: StylesConfig<SearchOptions, false, GroupBase<SearchOptions>> = {
  // react-select 기본 스타일을 적용하지 않습니다.
  valueContainer: (provided) => ({
    ...provided,
    padding: 0, // 기본 패딩 제거
    margin: 0, // 기본 마진 제거
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none', // 세로 구분선 제거
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none', // 화살표 제거
  }),
  // input 스타일을 추가합니다.
  input: (provided) => ({
    ...provided,
    color: '#D1D4E7', // text-gray-100 색상
    ...fontStyle,
    padding: 0, // 기본 패딩 제거
    margin: 0, // 기본 마진 제거
  }),
  // "No options" 메시지 스타일을 추가합니다.
  noOptionsMessage: (provided) => ({
    ...provided,
    color: '#D1D5DB',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Pretendard',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.28px',
  }),
  // control 스타일을 추가합니다.
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#202030',
    borderColor: state.isFocused ? '#ffffff' : '#D1D5DB',
    border: '1px solid',
    borderTopColor: '#202030',
    borderRightColor: '#202030',
    borderBottomColor: '#202030',
    borderLeftColor: '#202030',
    borderRadius: '12px', // rounded-md
    // 포커스 시 outline, boxShadow 제거
    outline: state.isFocused ? 'none' : undefined,
    boxShadow: state.isFocused ? 'none' : undefined,
    padding: '0.75rem', // p-3 (12px)
    '&:hover': {
      borderColor: '#202030',
    },
    '&:focus': {
      borderColor: '#202030',
    },
    '&:active': {
      borderColor: '#202030',
    },
    color: '#ffffff',
    height: '44px',
  }),
  // option 스타일을 추가합니다.
  option: (provided, state) => ({
    ...provided,
    backgroundColor: '#41425D',
    color: state.isSelected ? '#FFFFFF' : '#E5E7EB', // 텍스트 색상
    '&:hover': {
      backgroundColor: '#8661c94d',
      color: '#FFFFFF',
    },
    ...fontStyle,
  }),
  // menu 스타일을 추가합니다.
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#41425D', //  메뉴
    marginTop: '8px',
  }),
  // menuList 스타일을 추가합니다.
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    overflowY: 'auto', // 스크롤 가능
    // 스크롤바를 숨기기 위한 CSS
    scrollbarWidth: 'none', // Firefox용
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome, Safari, Edge
    },
  }),
  // placeholder 스타일을 추가합니다.
  placeholder: (provided) => ({
    ...provided,
    color: '#646486',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Pretendard',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.28px',
  }),
  // singleValue 스타일을 추가합니다. - 선택된 값
  singleValue: (provided) => ({
    ...provided,
    color: '#D1D4E7;',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Pretendard',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.28px',
  }),
};

export default SearchDropdown;
