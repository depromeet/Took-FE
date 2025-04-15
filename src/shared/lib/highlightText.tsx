import React from 'react'; // JSX 사용을 위해 필요!

export function highlightBase(text: string | undefined, keyword: string, className: string) {
  if (!keyword.trim()) return text;

  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text?.split(regex);

  return parts?.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function highlightText(text: string | undefined, keyword: string) {
  return highlightBase(text, keyword, 'text-secondary');
}

export function highlightTextBold(text: string | undefined, keyword: string) {
  return highlightBase(text, keyword, 'font-bold');
}
