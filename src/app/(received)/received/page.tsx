'use client';

import React from 'react';

import ReceivedCardView from '@/features/received/ui';
import Appbar from '@/shared/ui/appbar';
import { Navbar } from '@/shared/ui/Navigation';

function Page() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="received" />
        <ReceivedCardView />
        <Navbar />
      </div>
    </div>
  );
}

export default Page;
