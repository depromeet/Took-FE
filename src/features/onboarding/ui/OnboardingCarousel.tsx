'use client';

import React, { useState, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { slides } from '@/features/onboarding/config/slides';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import OnboardingSlide from './OnboardingSlide';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      onComplete();
    } else if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="relative w-full flex-1">
        {/*module Pagination사용으로 수정 */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
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
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <OnboardingSlide description={slide.description} imageUrl={slide.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/**
         * 커스텀 페이지네이션 위치
         * 반응형으로 위치 조정
         * - 반응형 위치가 아직 구현되지 않았습니다
         */}
        <div className="absolute bottom-28 left-0 right-0 z-10 sm:bottom-36 md:bottom-40 lg:bottom-48">
          <div className="custom-pagination flex justify-center"></div>
        </div>
      </div>

      <div className="mt-auto w-full bg-black p-6">
        <Button onClick={handleNext} className="w-full">
          <Typography variant="body-2">다음</Typography>
        </Button>
      </div>
    </div>
  );
}

export default OnboardingCarousel;
