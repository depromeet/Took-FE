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

    // 모바일 기기인 경우 딥링크 처리
    if (isMobileDevice && !isWebView) {
      // 조건1, 조건2 처리: 모바일에서는 로그인 여부와 상관없이 딥링크 시도
      deepLinkAttemptedRef.current = true;
      window.location.href = `took://card-share/${id}?save=true`;

      // 딥링크 취소/실패 감지를 위한 타임아웃 설정 (3초)
      timeoutRef.current = setTimeout(() => {
        // 조건1: 로그인 상태에서 딥링크 취소 시 카드 저장
        if (isLoggedIn) {
          handleSaveCard(id);
        }
        // 조건2: 비로그인 상태에서 딥링크 취소 시 아무 작업도 하지 않음
        deepLinkAttemptedRef.current = false;
        timeoutRef.current = null;
      }, 3000);
    }
    // 조건3: 웹이면서 로그인된 경우에만 저장 (비로그인 시 저장하지 않음)
    else if (isWeb && isLoggedIn) {
      handleSaveCard(id);
    }
  }, [isLoggedIn, isWebView, isMobileDevice, isWeb, id, handleSaveCard, setFromSharedCard]);
};
