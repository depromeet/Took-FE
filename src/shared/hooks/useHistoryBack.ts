import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

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

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.replace(window.location.href);
    }
  }, [router]);

  return handleBack;
};

export default useHistoryBack;
