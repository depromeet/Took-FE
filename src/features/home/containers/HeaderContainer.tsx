'use client';

import Appbar from '@/shared/ui/appbar';
import { useRouter } from 'next/navigation';

export const HeaderContainer = () => {
  const router = useRouter();

  const goToAlarmPage = () => {
    router.push('/setting/alram');
  };

  return (
    <section>
      <Appbar page="main" onRightClick={goToAlarmPage} />
    </section>
  );
};
