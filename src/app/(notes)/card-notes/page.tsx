import React from 'react';

import CardNotes from '@/features/card-notes/ui/cardNotes';

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <CardNotes />
      </div>
    </div>
  );
}
export default Page;
