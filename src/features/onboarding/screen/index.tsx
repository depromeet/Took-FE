'use client';

import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { slides } from '../config/slides';
import { FirstOnboardingContainer } from '../containers/FirstOnboardingContainer';

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
    <>
      {showOnboarding && (
        <Swiper
          className="mx-auto h-dvh w-full max-w-[600px]"
          modules={[Pagination, Autoplay]}
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
          <SwiperSlide>
            <FirstOnboardingContainer />
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}
