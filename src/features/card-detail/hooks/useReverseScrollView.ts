import { useEffect, useState } from 'react';

function useReverseScrollView() {
  const [isReverseScroll, setIsReverseScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        setIsReverseScroll(true);
      } else if (event.deltaY > 0) {
        setIsReverseScroll(false);
        // 탭바 숨기기 등 처리
      }
    });
  }, []);

  return { isReverseScroll };
}

export default useReverseScrollView;
