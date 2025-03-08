import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseBottomOffsetProps {
  offset?: number;
  onTrigger: () => void;
}

export const useBottomOffset = ({ offset = 10, onTrigger }: UseBottomOffsetProps) => {
  const { ref, entry } = useInView({
    rootMargin: `0px 0px ${offset}px 0px`,
    threshold: 0,
  });

  // 초기 렌더링을 추적하기 위한 ref
  const isInitialRender = useRef(true);

  useEffect(() => {
    // 첫 번째 감지는 건너뜁니다
    if (entry?.isIntersecting) {
      if (isInitialRender.current) {
        isInitialRender.current = false;
      } else {
        onTrigger(); // 초기 렌더링 이후에만 호출됨
      }
    }
  }, [entry, onTrigger]);

  return { ref };
};
