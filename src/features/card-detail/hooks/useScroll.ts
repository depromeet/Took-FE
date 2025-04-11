'use client';

import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    // 스크롤 컨테이너 찾기
    const scrollContainer = document.querySelector('.overflow-y-auto') || window;

    const handleScroll = () => {
      if (scrollContainer === window) {
        setIsScroll(window.scrollY > 10);
      } else {
        setIsScroll((scrollContainer as HTMLElement).scrollTop > 10);
      }
    };

    // 이벤트 리스너 등록
    scrollContainer.addEventListener('scroll', handleScroll);

    // 초기 상태 확인
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScroll;
};
