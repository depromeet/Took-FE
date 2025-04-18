import {
  isMobile as isDeviceMobile,
  isTablet,
  isMobileOnly,
  isIOS as isIOSDevice,
  isAndroid as isAndroidDevice,
  isSafari,
  isChrome,
  isBrowser,
} from 'react-device-detect';

import { useWebview } from './useWebview';
import { useWindowSize } from './useWindowSize';

// 모바일 화면 최대 크기 - 태블릿 포함
const MAX_MOBILE_SIZE = 992;

/**
 * 디바이스 정보를 제공하는 hook
 * @returns
 * isWebView: 웹뷰 여부
 * isMobile: 모바일 여부
 * isMobileDevice: 모바일 기기 여부 (태블릿 포함)
 * isMobileOnly: 모바일 폰만 (태블릿 제외)
 * isTablet: 태블릿 여부
 * isIOS: iOS 여부
 * isAndroid: Android 여부
 */

const useDevice = () => {
  const { isWebView } = useWebview();
  const { width: windowWidth } = useWindowSize();
  const isMobile = !!windowWidth && windowWidth < MAX_MOBILE_SIZE;

  return {
    isWebView,
    // 화면 크기 기반 모바일 여부 (기존 로직 유지)
    isMobile,

    isMobileDevice: isDeviceMobile,
    isMobileOnly,
    isTablet,
    isIOS: isIOSDevice,
    isAndroid: isAndroidDevice,

    // 브라우저 정보
    isBrowser,
    isSafari,
    isChrome,

    // 웹 환경 여부 (모바일 기기가 아니고 웹뷰도 아닌 경우)
    isWeb: isBrowser && !isDeviceMobile && !isWebView,
  };
};

export default useDevice;
