import 'swiper/css';
import 'swiper/css/pagination';

import { CardContainer } from '@/features/home/containers/CardContainer';
import Appbar from '@/shared/ui/appbar';

export default function Home() {
  return (
    <div className="mx-auto h-dvh w-full max-w-[600px] justify-center">
      <Appbar page="main" />
      <CardContainer />
    </div>
  );
}
