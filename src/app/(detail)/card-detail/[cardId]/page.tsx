import { Suspense } from 'react';

import CardDetailHeader from '@/features/card-detail/ui/cardDetailHeader';
import CardTabs from '@/features/card-detail/ui/cardTabs';

// type PageParmas = {
//   cardId: string;
// };

function Page() {
  //const { queryClient } = getCardDetailPrefetch(cookies(), cardId);

  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <Suspense fallback={<div>로딩중입니다...</div>}>
          <CardDetailHeader />
          <CardTabs />
        </Suspense>
      </div>
    </div>
    // <HydrationBoundary state={dehydrate(queryClient)}>

    // </HydrationBoundary>
  );
}

export default Page;
