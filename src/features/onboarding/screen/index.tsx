'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import { slides } from '../config/slides';
import { BackgroundContainer } from '../containers/BackgroundContainer';

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      router.replace('/login');
    } else if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
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
      </div>
    </section>
  );
}
