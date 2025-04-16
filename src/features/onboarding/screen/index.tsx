'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useDevice from '@/shared/hooks/useDevice';
import usePushToken from '@/shared/hooks/usePushToken';
import { webLogger } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Toast from '@/shared/ui/Toast';
import { Typography } from '@/shared/ui/typography';

import { slides } from '../config/slides';
import { BackgroundContainer } from '../containers/BackgroundContainer';

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const { isWebView } = useDevice();
  const { expoToken, requestToken, hasToken } = usePushToken();

  // 웹뷰 환경에서 푸시 토큰 상태 확인 및 로깅
  useEffect(() => {
    if (isWebView) {
      webLogger.token('온보딩 화면 로드됨');

      if (expoToken) {
        webLogger.token('온보딩: 토큰 이미 존재함', { expoToken });
      } else {
        webLogger.token('온보딩: 토큰 요청 필요');
        requestToken();
      }
    }
  }, [isWebView, expoToken, requestToken]);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      // 로그인 화면으로 이동 시 토큰 상태 로깅
      if (isWebView) {
        webLogger.token('온보딩 완료, 로그인으로 이동', { hasToken, expoToken });
      }
      router.replace('/login');
    } else if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <section className="relative mx-auto h-dvh w-full max-w-[600px] overflow-hidden">
        <div className="absolute z-[-10]">
          <BackgroundContainer activeIndex={activeIndex} />
        </div>

        <Swiper
          className="h-full w-full"
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'inline-block h-2 w-2 rounded-full mx-1 bg-white opacity-50',
            bulletActiveClass: '!opacity-100',
          }}
          navigation={false}
        >
          {slides.map(({ id, component }) => {
            const Component = component;

            return (
              <SwiperSlide className="overflow-hidden" key={id}>
                <Component />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="absolute bottom-0 z-10 mt-auto w-full p-6">
          <div className="flex w-full flex-col items-center justify-center pb-8">
            <Typography variant="title-2">{slides[activeIndex].descriptions[0]}</Typography>
            <Typography variant="title-2">{slides[activeIndex].descriptions[1]}</Typography>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <div className="custom-pagination flex justify-center"></div>
          </div>

          <Button onClick={handleNext} className="w-full">
            <Typography variant="body-2">다음</Typography>
          </Button>

          {isWebView && (
            <div className="mt-2 text-center">
              <Typography variant="caption-1" className="text-gray-400">
                {hasToken ? '기기 알림 준비 완료' : '기기 알림 설정 중...'}
              </Typography>
            </div>
          )}
        </div>
      </section>
      <Toast />
    </>
  );
}
