'use client';

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
      <div className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden">
        <QrContainer {...params} />
      </div>
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
