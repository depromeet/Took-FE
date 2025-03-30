import { Toaster } from 'sonner';

import { QrContainer } from '@/features/share/containers/QrContainer';
import { SegmentContainer } from '@/features/share/containers/SegmentContainer';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Share() {
  return (
    <>
      <div className="relative mx-auto h-dvh w-full max-w-[600px] overflow-x-hidden">
        <SegmentContainer className="absolute" />
        <QrContainer />
      </div>
      <Toaster position="top-center" />
    </>
  );
}
