'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import { Toaster } from 'sonner';

import { HomeBackground } from '@/features/home/components/BusinessCard/Background/HomeBackground';
import { CardContainer } from '@/features/home/containers/CardContainer';
import { HeaderContainer } from '@/features/home/containers/HeaderContainer';
import { Navbar } from '@/shared/ui/Navigation';

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden"
      >
        <HomeBackground className="absolute z-[-10]" />
        <HeaderContainer />
        {/* <div className="pointer-events-none absolute left-0 top-[4rem] z-10 h-20 w-full bg-gradient-to-b from-gray-black via-gray-black to-transparent" /> */}
        <div className="pointer-events-none absolute left-0 top-16 z-10 h-[3.5rem] w-full bg-[linear-gradient(180deg,_#14141A_0%,_#14141A_50%,_transparent_100%)]" />
        <section className="z-bar mt-6 pb-20">
          <CardContainer />
        </section>
        <Navbar />
      </motion.div>
      <Toaster position="top-center" />
    </>
  );
}
