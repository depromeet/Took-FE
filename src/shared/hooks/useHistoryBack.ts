import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useShareStore } from '@/features/share/store/shareStore';

import handleAxiosError from '../utils/handleAxiosError';

import { useIsLoggedIn } from './useIsLoggedIn';

/**
 * useHistoryBack 훅은 사용자가 이전 페이지로 이동할 수 있도록 도와줍니다.
 *
 * @returns {Function} handleBack - 이전 페이지로 이동하거나 현재 페이지를 다시 로드하는 함수
 *
 * @example
 * const handleBack = useHistoryBack();
 *
 * // 버튼 클릭 시 이전 페이지로 이동
 * <button onClick={handleBack}>뒤로 가기</button>
 */

const useHistoryBack = () => {
  const router = useRouter();
  const isFromSharedCard = useShareStore((state) => state.isFromSharedCard);
  const setFromSharedCard = useShareStore((state) => state.setFromSharedCard);
  const { isLoggedIn } = useIsLoggedIn();

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      // 공유 명함 페이지에 접속한 경우
      if (isFromSharedCard) {
        // 로그인 한 경우
        if (isLoggedIn) {
          router.replace(`/received`);
          setFromSharedCard(false);
        } else {
          const error = new Error('로그인을 먼저 진행해주세요');
          setFromSharedCard(false);
          handleAxiosError(error);

          // 토스트 메시지가 표시될 시간을 주기 위해 약간의 지연 후 페이지 이동
          setTimeout(() => {
            router.replace(`/onboarding`);
            setFromSharedCard(false);
          }, 1000);
        }
      } else {
        router.back();
      }
    } else {
      router.replace(window.location.href);
    }
  }, [isFromSharedCard, isLoggedIn, router, setFromSharedCard]);

  return handleBack;
};

export default useHistoryBack;
