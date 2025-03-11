'use client';

import { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';

export const CardSwiperProvider = ({ children }: PropsWithChildren) => {
  return <Swiper>{children}</Swiper>;
};
