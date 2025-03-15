import 'swiper/css';
import 'swiper/css/pagination';

import { Toaster } from 'sonner';

import { HomeBackground } from '@/features/home/components/BusinessCard/Background/HomeBackground';
import { CardContainer } from '@/features/home/containers/CardContainer';
import { ClipboardContainer } from '@/features/home/containers/ClipboardContainer';
import { HeaderContainer } from '@/features/home/containers/HeaderContainer';

export default function Home() {
  return (
    <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
      <HomeBackground className="absolute" />
      <HeaderContainer />
      <section className="absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 pb-20">
        <CardContainer />
        <ClipboardContainer />
      </section>
      <Toaster position="top-center" />
    </div>
  );
}
