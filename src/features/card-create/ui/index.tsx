"use client";

import Appbar from '@/shared/ui/appbar';
import OnBoardingView from './onBoardingView';
import useHistoryBack from '@/shared/hooks/useHistoryBack';

const CardCreateView = () => {
  const handleBack = useHistoryBack();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className='flex flex-col w-full max-w-[600px] bg-gray-black'>
        <Appbar page='create' onLeftClick={handleBack} />
        <OnBoardingView />
      </div>
    </div>
  );
}

export default CardCreateView;