'use client';

import { useEffect, useState } from 'react';

import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import SearchCardView from '@/features/received/ui/search/searchCardView';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import Toast from '@/shared/ui/Toast';

type SearchKeywordType = {
  createdAt: string;
  keyword: string;
};

function Page() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색을 완료했는가? true - 최근 검색어 모달 off

  const { cards: serverReceivedCards, isLoading: isCardsLoading } = useReceivedCardsQuery(null);
  const handleBack = useHistoryBack();

  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (!isCardsLoading) setReceivedCards(serverReceivedCards);
  }, [isCardsLoading, serverReceivedCards, setReceivedCards]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function saveSearchKeyword(keyword: string) {
    if (typeof window === 'undefined') return;
    if (!keyword.trim()) return;

    const newKeyword: SearchKeywordType = {
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      keyword: searchValue.trim(),
    };

    const storageKey = 'latest'; // 추후 상수파일로 옮겨놓기

    // 기존 검색어 불러오기
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]') as SearchKeywordType[];

    // 중복 제거 (같은 keyword 있는 거 제거)
    const filtered = existing.filter((entry) => entry.keyword !== keyword);
    const updated = [newKeyword, ...filtered].slice(0, 10);

    localStorage.setItem(storageKey, JSON.stringify(updated));

    window.dispatchEvent(new Event('latestSearchUpdated'));

    setIsSearched(true);
  }

  const handleSetSearchKeywordKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.nativeEvent.isComposing) return;
    if (e?.key !== 'Enter') return;

    e.preventDefault();
    saveSearchKeyword(searchValue);
  };

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar
          page="search"
          onLeftClick={handleBack}
          onRightClick={() => saveSearchKeyword(searchValue)}
          onSearchChange={handleSearchChange}
          onKeyDown={(e) => handleSetSearchKeywordKeyDown(e)}
        />
        <div className="overflow-y-auto px-5 pb-24 pt-4 scrollbar-hide">
          <SearchCardView searchValue={searchValue} isSearched={isSearched} />
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default Page;
