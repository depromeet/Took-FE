import { useEffect, useState } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * @param refreshIntervalMs 위치를 다시 가져올 간격(ms). 기본 3000ms.
 */
export const useCurrentLocation = (refreshIntervalMs: number = 3000) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation을 지원하지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const getPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!isMounted) return;
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          if (!isMounted) return;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('위치 권한이 거부되었습니다.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('위치 정보를 사용할 수 없습니다.');
              break;
            case err.TIMEOUT:
              setError('위치 정보를 가져오는 데 시간이 초과되었습니다.');
              break;
            default:
              setError('알 수 없는 에러가 발생했습니다.');
          }
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    };

    // 초기 호출
    getPosition();
    // 주기적 호출
    const id = setInterval(getPosition, refreshIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [refreshIntervalMs]);

  return { location, loading, error };
};
