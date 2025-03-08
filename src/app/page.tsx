import 'swiper/css';
import 'swiper/css/pagination';

import { CardContainer } from '@/features/home/containers/CardContainer';
import { ClipboardContainer } from '@/features/home/containers/ClipboardContainer';
import { HeaderContainer } from '@/features/home/containers/HeaderContainer';

export default function Home() {
  return (
    <div className="mx-auto h-dvh w-full max-w-[600px] justify-center">
      <HeaderContainer />
      <section className="h-[calc(100dvh-64px-80px)] w-full">
        <CardContainer />
        <ClipboardContainer />
      </section>
    </div>
  );
}
