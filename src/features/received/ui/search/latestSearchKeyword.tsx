'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { highlightTextBold } from '@/shared/lib/highlightText';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

type LatestType = {
  createdAt: string;
  keyword: string;
};

type LatestSearchKeywordProps = {
  setIsSearched: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export default function LatestSearchKeyword({ setIsSearched, searchValue, setSearchValue }: LatestSearchKeywordProps) {
  const [latestSearchKeywords, setLatestSearchKeywords] = useState<LatestType[]>([]);

  useEffect(() => {
    const latestRaw = localStorage.getItem('latest');
    if (latestRaw) {
      try {
        const parsed = JSON.parse(latestRaw) as LatestType[];
        setLatestSearchKeywords(parsed);
      } catch (e) {
        console.error('최근 검색어 파싱 실패:', e);
      }
    }
  }, []);

  const handleDeleteKeyword = (keywordToDelete: string) => {
    if (typeof window === 'undefined') return;

    const existing = JSON.parse(localStorage.getItem('latest') || '[]') as LatestType[];
    const filtered = existing.filter((entry) => entry.keyword !== keywordToDelete);

    localStorage.setItem('latest', JSON.stringify(filtered));
    setLatestSearchKeywords(latestSearchKeywords.filter((entry) => entry.keyword !== keywordToDelete));
  };

  const handleDeleteAllKeyword = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('latest');
    setLatestSearchKeywords([]);
  };

  const lowerSearch = searchValue.toLowerCase().trim();
  const filteredSearchKeyword = latestSearchKeywords
    .filter((keyword) => {
      const textTarget = keyword.keyword;
      return textTarget.toLowerCase().includes(lowerSearch);
    })
    .slice(0, 3);

  const handleClick = (keyword: string) => {
    setIsSearched(true);
    setSearchValue(keyword);
  };

  return (
    <div className={cn('h-auto w-full')}>
      {searchValue === '' && (
        <header className={cn('flex items-center justify-between', spacingStyles({ marginBottom: 'md' }))}>
          <p className="text-caption-1 text-gray-300">최근 검색어</p>
          <button className="cursor-pointer text-caption-1 font-bold text-white" onClick={handleDeleteAllKeyword}>
            전체 삭제
          </button>
        </header>
      )}
      {(searchValue ? filteredSearchKeyword : latestSearchKeywords).map((value, index) => {
        return (
          <div
            key={index}
            className={cn('flex cursor-pointer items-center justify-between gap-3', spacingStyles({ paddingY: 'ml' }))}
            onClick={() => handleClick(value.keyword)}
          >
            <Image src="/icons/clockIcon.svg" alt="시계 아이콘" width={16} height={16} />
            <p className="w-full text-body-5 text-white">{highlightTextBold(value.keyword, searchValue ?? '')}</p>
            <Image
              src="/icons/deleteIcon.svg"
              alt="삭제 아이콘"
              width={20}
              height={20}
              onClick={() => handleDeleteKeyword(value.keyword)}
              className={cn(searchValue !== '' && 'hidden')}
            />
          </div>
        );
      })}
      <section className="-mx-5 mb-4 h-[2px] bg-gray-800" />
    </div>
  );
}
