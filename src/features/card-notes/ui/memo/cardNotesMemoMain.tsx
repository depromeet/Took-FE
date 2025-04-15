'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import WrappedInput from '@/shared/ui/Input';

import { useCardQuery } from '../../hooks/queries/useCardQuery';
import { useSelectCardStore } from '../../store/selectCardStore';

import CardNotesMemoCard from './cardNotesMemoCard';

function CardNotesMemoMain() {
  const { data } = useCardQuery();
  const { selectedCardIds } = useSelectCardStore();

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [memos, setMemos] = useState<Record<number, string>>({});
  const [currentMemo, setCurrentMemo] = useState('');

  const cardNotes = data?.cards;
  const filteredCards = cardNotes ? cardNotes?.filter((card) => selectedCardIds.includes(card.id)) : [];

  // 스와이퍼 변경 시 id값 변경
  const handleActiveCardChange = useCallback(
    (cardId: number) => {
      setActiveCardId(cardId);
      setCurrentMemo(memos[cardId] || '');
    },
    [memos],
  );

  // 메모 입력 핸들러
  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value;
    setCurrentMemo(newMemo);

    // 현재 카드 ID가 있을 경우, 해당 카드의 메모 업데이트
    if (activeCardId) {
      setMemos((prev) => {
        const updated = {
          ...prev,
          [activeCardId]: newMemo,
        };
        return updated;
      });
    }
  };

  // 메모 저장 처리
  const handleSaveMemo = () => {
    // 메모가 하나라도 있는지 확인
    const hasMemos = Object.values(memos).some((memo) => memo.trim() !== '');

    if (!hasMemos) {
      toast.error('메모를 먼저 작성해주세요');
      return;
    }

    if (filteredCards.length === 0) return;

    // 모든 카드와 메모 정보 확인
    const memosToSave = Object.entries(memos)
      .filter(([_, memo]) => memo.trim() !== '') // 빈 메모는 제외
      .map(([cardId, memo]) => ({
        cardId: parseInt(cardId),
        memo,
      }));

    console.log('저장할 메모 목록:', memosToSave);
    localStorage.removeItem('card-selection-storage');
    toast.success('메모가 저장되었습니다.');
  };

  // 카드 배열이 변경될 때만 초기 카드 ID 설정
  useEffect(() => {
    if (filteredCards.length > 0 && activeCardId === null) {
      const firstCardId = filteredCards[0].id;
      setActiveCardId(firstCardId);
    }
  }, []);

  return (
    <div className="mt-[12px]">
      {/* 선택된 카드 표시 영역 */}
      <div className="relative flex h-full justify-center">
        {filteredCards.length > 0 ? (
          <CardNotesMemoCard
            cards={filteredCards}
            isMemo={true}
            onActiveCardChange={handleActiveCardChange}
            key="card-swiper" // 키 추가
          />
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-gray-medium">선택된 명함이 없습니다</p>
          </div>
        )}
      </div>

      {/* 메모 입력 영역 */}
      <div className="mt-4 px-[20px]">
        <WrappedInput
          placeholder="상대방에 대해 기록하고 싶은 한 줄 메모를 남겨주세요"
          value={currentMemo}
          onChange={handleMemoChange}
        />

        {/* 현재 메모 상태 표시 (디버깅용, 실제 서비스에서는 제거) */}
        <div className="mt-2 text-xs text-gray-500">
          {activeCardId && (
            <p>
              현재 카드 ID: {activeCardId}, 작성된 메모 수:{' '}
              {Object.keys(memos).filter((key) => memos[parseInt(key)].trim() !== '').length}/{filteredCards.length}
            </p>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-[20px] pb-[18px] pt-[8px]">
        <button
          className="w-full rounded-md bg-primary-active px-[32px] py-[15px] text-title-4 text-white"
          onClick={handleSaveMemo}
        >
          메모 남기기
        </button>
      </div>
    </div>
  );
}

export default CardNotesMemoMain;
