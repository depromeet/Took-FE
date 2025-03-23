'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import { Background } from '../components/FirstOnboarding/Background';
import { slides } from '../config/slides';

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      handleOnboardingComplete();
    } else if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className="relative mx-auto h-dvh w-full max-w-[600px]">
      <div className="absolute z-[-10]">
        <Background />
      </div>
      {showOnboarding && (
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
          {slides.map(({ id, render }) => (
            <SwiperSlide className="overflow-hidden" key={id}>
              {render()}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="absolute bottom-0 z-10 mt-auto w-full p-6">
        <div className="mb-10 flex items-center justify-center">
          <div className="custom-pagination flex justify-center"></div>
        </div>
        <Button onClick={handleNext} className="w-full">
          <Typography variant="body-2">다음</Typography>
        </Button>
      </div>
    </section>
  );
}
