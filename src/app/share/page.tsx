import { Toaster } from 'sonner';

import { QrContainer } from '@/features/share/containers/QrContainer';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Share() {
  // TODO: 추후 3차 MVP 시 SegmentContainer 도입 필요

  return (
    <>
      <div className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden">
        {/* <SegmentContainer className="absolute" /> */}
        <QrContainer />
      </div>
      <Toaster position="top-center" />
    </>
  );
}
