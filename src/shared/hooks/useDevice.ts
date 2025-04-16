import { useEffect, useRef, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

const MAX_MOBILE_SIZE = 992; // 모바일 최대 사이즈

// 웹뷰 여부를 제공하는 hook
const useWebview = () => {
  const isWebViewRef = useRef(false);

  useEffect(() => {
    if (isWebViewRef.current) return;

    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      isWebViewRef.current = true;
    }
  }, []);

  return {
    isWebView: isWebViewRef.current,
  };
};

// 윈도우 사이즈를 제공하는 hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowSize({ width, height });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// 디바이스 정보를 제공하는 hook
const useDevice = () => {
  const { isWebView } = useWebview();
  const { width: windowWidth } = useWindowSize();
  const isMobile = !!windowWidth && windowWidth < MAX_MOBILE_SIZE;

  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;

      // 모바일 기기 확인
      const mobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent);
      setIsMobileDevice(mobileDevice);

      // iOS 확인
      const ios = /iPhone|iPad|iPod/i.test(userAgent);
      setIsIOS(ios);

      // Android 확인
      const android = /Android/i.test(userAgent);
      setIsAndroid(android);

      // 웹 환경 확인 (모바일 기기가 아니고 웹뷰도 아닌 경우)
      setIsWeb(!mobileDevice && !isWebView);
    }
  }, [isWebView]);

  return {
    isWebView,
    isMobile, // 화면 크기 기반 모바일 여부
    isMobileDevice, // User Agent 기반 모바일 기기 여부
    isIOS,
    isAndroid,
    isWeb, // 데스크탑 웹 브라우저 여부
  };
};

export default useDevice;
