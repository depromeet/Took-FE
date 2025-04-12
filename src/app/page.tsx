import 'swiper/css';
import 'swiper/css/pagination';

import { Toaster } from 'sonner';

import { HomeBackground } from '@/features/home/components/BusinessCard/Background/HomeBackground';
import { CardContainer } from '@/features/home/containers/CardContainer';
import { HeaderContainer } from '@/features/home/containers/HeaderContainer';
import { Navbar } from '@/shared/ui/Navigation';

export default function Home() {
  return (
    <>
      <div className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden">
        <HomeBackground className="absolute z-[-10]" />
        <HeaderContainer />
        <section className="pb-[108px] pt-[24px]">
          <CardContainer />
        </section>
        <Navbar />
      </div>
      <Toaster position="top-center" />
    </>
  );
}
