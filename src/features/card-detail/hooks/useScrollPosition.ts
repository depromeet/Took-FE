'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 뷰포트와 교차하는지 감지하는 훅
 * @param options IntersectionObserver 옵션
 * @returns ref와 교차 여부
 */
export function useScrollPosition(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(true); // 초기값 true로 설정
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // entry.isIntersecting: 관찰 대상이 뷰포트와 교차하는지 여부
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return { ref: targetRef, isIntersecting };
}
