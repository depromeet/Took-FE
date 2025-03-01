'use client';

import React, { useState, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import OnboardingSlide from './OnboardingSlide';

const slides = [
  {
    id: 1,
    description: ['과한 시작정보는 빼고', '내가 원하는 정보만'],
    imageUrl: '/images/login/onboarding/onboarding-1.png',
  },
  {
    id: 2,
    description: ['QR로 쉽게 공유하고', '블루투스로 쉽게 아카이빙하는'],
    imageUrl: '/images/login/onboarding/onboarding-2.png',
  },
  {
    id: 3,
    description: ['손쉽게 툭 공유하는', '나만의 명함'],
    imageUrl: '/images/login/onboarding/onboarding-3.png',
  },
];

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  const Pagination = () => (
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
          modules={[Pagination, Navigation, Autoplay]}
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
              <OnboardingSlide description={slide.description} imageUrl={slide.imageUrl} pagination={<Pagination />} />
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
