'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import useDevice from '@/shared/hooks/useDevice';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';

/**
 * 카드 상세 페이지 이동 관련 로직을 담당하는 커스텀 훅
 * 사용자 클릭 시 호출되어 로그인 상태와 디바이스에 따라 적절한 이동 처리
 */
export const useCardDetail = (id: string) => {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();
  const { isMobileDevice } = useDevice();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const deepLinkAttemptedRef = useRef(false);

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

  // 명함 상세 페이지로 이동하는 함수
  const handleMoveToDetail = () => {
    // 모바일 기기에서는 항상 앱으로 딥링크 시도
    if (isMobileDevice) {
      deepLinkAttemptedRef.current = true;
      window.location.href = `took://card-detail/${id}?type=receivedcard&save=true`;

      // 딥링크 취소/실패 감지를 위한 타임아웃 설정
      timeoutRef.current = setTimeout(() => {
        // 로그인 상태인 경우 상세 페이지로 이동 가능
        if (isLoggedIn) {
          router.push(`/card-detail/${id}?type=receivedcard`);
        }
        // 비로그인 상태에서는 그대로 유지 또는 로그인 페이지로 리다이렉트
        // 필요에 따라 router.push('/login') 추가 가능
        deepLinkAttemptedRef.current = false;
        timeoutRef.current = null;
      }, 3000);
    } else {
      // 웹에서는 로그인 상태인 경우만 상세 페이지로 이동
      if (isLoggedIn) {
        router.push(`/card-detail/${id}?type=receivedcard`);
      } else {
        // 비로그인 상태에서는 로그인 페이지로 이동
        router.push('/login');
      }
    }
  };

  return {
    handleMoveToDetail,
  };
};
