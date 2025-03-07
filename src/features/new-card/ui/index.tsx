"use client";

import Appbar from '@/shared/ui/appbar';
import NewCreateCardView from './newCreateCardView';
import useHistoryBack from '@/shared/hooks/useHistoryBack';

function CareerSelectView() {
  const handleBack = useHistoryBack();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className='flex flex-col w-full max-w-[600px] bg-gray-black'>
        <Appbar page='create' onLeftClick={handleBack} />
        <NewCreateCardView />
      </div>
    </div>
  )
}

export default CareerSelectView;
