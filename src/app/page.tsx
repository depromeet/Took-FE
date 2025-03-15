import { Navbar } from '@/shared/ui/Navigation';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <div className="mx-auto h-dvh w-full max-w-[600px] justify-center">
      <Navbar />
    </div>
  );
}
