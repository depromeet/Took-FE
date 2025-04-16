'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import ReceivedCardList from '../receivedCardList';

import LatestSearchKeyword from './latestSearchKeyword';

type SearchCardViewProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  isSearched: boolean;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
};

export default function SearchCardView({
  searchValue,
  setSearchValue,
  isSearched,
  setIsSearched,
}: SearchCardViewProps) {
  const [hasLatest, setHasLatest] = useState(false); // 최근검색어 유무

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const latest = localStorage.getItem('latest');
      setHasLatest(!!latest);
    }
  }, []);

  return (
    <>
      {hasLatest && !isSearched && (
        <LatestSearchKeyword setIsSearched={setIsSearched} searchValue={searchValue} setSearchValue={setSearchValue} />
      )}
      <ReceivedCardList selectedFolderId={null} searchValue={searchValue} />
    </>
  );
}
