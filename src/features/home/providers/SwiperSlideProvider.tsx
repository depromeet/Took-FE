'use client';

import { PropsWithChildren } from 'react';
import { SwiperSlide } from 'swiper/react';

export const SwiperSlideProvider = ({ children }: PropsWithChildren) => {
  return <SwiperSlide>{children}</SwiperSlide>;
};
