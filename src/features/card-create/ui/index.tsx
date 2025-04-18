'use client';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';

import OnBoardingView from './onBoardingView';

const CardCreateView = () => {
  const handleBack = useHistoryBack();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="create" onLeftClick={handleBack} />
        <OnBoardingView />
      </div>
    </div>
  );
};

export default CardCreateView;
