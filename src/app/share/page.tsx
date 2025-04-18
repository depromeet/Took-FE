'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { JobType } from '@/features/card-detail/config/jobs-config';
import { QrContainer } from '@/features/share/containers/QrContainer';

import 'swiper/css';
import 'swiper/css/pagination';

const Share = () => {
  const searchParams = useSearchParams();
  const decodingUrl = decodeURIComponent(searchParams.get('profileImg') || '');
  const params = {
    profileImg: decodingUrl,
    name: searchParams.get('name') || '',
    job: searchParams.get('job') || '',
    jobType: searchParams.get('jobType') as JobType,
    url: searchParams.get('url') || '',
    cardId: searchParams.get('cardId') || '',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden"
      >
        <QrContainer {...params} />
      </motion.div>
      <Toaster position="top-center" />
    </>
  );
};

export default function Hoc() {
  return (
    <Suspense>
      <Share />
    </Suspense>
  );
}
