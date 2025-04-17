import { useEffect, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

// 윈도우 사이즈를 제공하는 hook
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        setWindowSize({ width, height });
      }
    };

    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    return undefined;
  }, []);

  return windowSize;
};
