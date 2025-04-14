'use client';

import { useEffect, useState } from 'react';

import ReceivedCardList from '../receivedCardList';

import LatestSearchKeyword from './latestSearchKeyword';

type SearchCardViewProps = {
  searchValue: string;
  isSearched: boolean;
};

export default function SearchCardView({ searchValue, isSearched }: SearchCardViewProps) {
  const [hasLatest, setHasLatest] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const latest = localStorage.getItem('latest');
      setHasLatest(!!latest);
    }
  }, []);

  return (
    <>
      {hasLatest && !isSearched && <LatestSearchKeyword searchValue={searchValue} />}
      <ReceivedCardList selectedFolderId={null} searchValue={searchValue} />
    </>
  );
}
