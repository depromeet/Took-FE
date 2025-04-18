'use client';

import { useRouter } from 'next/navigation';

import Appbar from '@/shared/ui/appbar';

export const HeaderContainer = () => {
  const router = useRouter();

  const goToAlarmPage = () => {
    router.push('/setting/alram');
  };

  return (
    <section>
      <Appbar page="main" onRightClick={goToAlarmPage} hasBackground={true} />
    </section>
  );
};
