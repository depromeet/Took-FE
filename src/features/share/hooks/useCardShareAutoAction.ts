'use client';

import { useEffect, useRef } from 'react';

import useDevice from '@/shared/hooks/useDevice';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';

import { useSaveCard } from '../hooks/mutations/useSaveCard';
import { useShareStore } from '../store/shareStore';

/**
 * 카드 공유 페이지 로드 시 자동으로 실행될 동작을 담당하는 커스텀 훅
 * - 명함 공유 페이지 접근 표시
 * - 모바일 앱 딥링크 시도
 * - 로그인 상태에 따른 카드 저장 처리
 */
export const useCardShareAutoAction = (id: string) => {
  const { isLoggedIn } = useIsLoggedIn();
  const { isWebView, isMobileDevice, isWeb } = useDevice();
  const setFromSharedCard = useShareStore((state) => state.setFromSharedCard);
  const deepLinkAttemptedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 명함 저장 API 호출
  const { mutate: handleSaveCard } = useSaveCard();

  // 딥링크 시도 후 앱으로 전환 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 페이지가 다시 보이게 되었을 때 (딥링크 앱에서 돌아왔을 때)
      if (document.visibilityState === 'visible' && deepLinkAttemptedRef.current) {
        deepLinkAttemptedRef.current = false;

        // 타임아웃이 있다면 제거 (딥링크가 성공적으로 처리되었음)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // 컴포넌트 언마운트 시 타임아웃 정리
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 명함 공유 페이지에서 접근했음을 표시하는 효과와 자동 동작 실행
  useEffect(() => {
    setFromSharedCard(true);

    // URL에서 이미 save 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const alreadySaved = urlParams.get('saved') === 'true';

    // 이미 저장 시도가 있었다면 딥링크 시도하지 않음
    if (!alreadySaved && isMobileDevice && !isWebView) {
      deepLinkAttemptedRef.current = true;

      // saved 파라미터를 추가하여 기록
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.set('saved', 'true');
      window.history.replaceState({}, '', url);

      // 딥링크 시도 (save=true)
      window.location.href = `took://card-share/${id}?save=true`;
    }
    // 조건3: 웹이면서 로그인된 경우에만 저장 (비로그인 시 저장하지 않음)
    else if (isWeb && isLoggedIn) {
      handleSaveCard(id);
    }
  }, [isLoggedIn, isWebView, isMobileDevice, isWeb, id, handleSaveCard, setFromSharedCard]);
};
