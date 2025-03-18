'use client';

import { useEffect, RefObject } from 'react';

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const handleEvent = (event: MouseEvent | TouchEvent) => {
      // ref가 유효하지 않거나, 클릭한 대상이 ref 내부에 있다면 종료
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // 외부 클릭 또는 터치 시 콜백 실행
      callback(event);
    };

    // mousedown과 touchstart 이벤트 등록
    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);

    // cleanup: 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;
