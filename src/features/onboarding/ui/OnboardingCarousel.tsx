'use client';

import React, { useState, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
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

  const handleNext = (): void => {
    if (activeIndex === slides.length - 1) {
      onComplete();
    } else if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType): void => {
    setActiveIndex(swiper.realIndex);
  };

  const SlidePagination = () => (
    <div className="mb-8 flex space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          className={`h-2 rounded-full transition-all ${
            index === activeIndex ? 'w-2 bg-white' : 'w-2 bg-white opacity-50'
          }`}
          onClick={() => swiperRef.current?.slideToLoop(index)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="w-full flex-1">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          pagination={false}
          navigation={false}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <OnboardingSlide
                description={slide.description}
                imageUrl={slide.imageUrl}
                pagination={<SlidePagination />}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
