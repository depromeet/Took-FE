import React from 'react'; // JSX 사용을 위해 필요!

export function highlightText(text: string | undefined, keyword: string) {
  if (!keyword.trim()) return text;

  const regex = new RegExp(`(${keyword})`, 'gi'); // 대소문자 구분 없이
  const parts = text?.split(regex);

  return parts?.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="text-secondary">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function highlightTextBold(text: string | undefined, keyword: string) {
  if (!keyword.trim()) return text;

  const regex = new RegExp(`(${keyword})`, 'gi'); // 대소문자 구분 없이
  const parts = text?.split(regex);

  return parts?.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
