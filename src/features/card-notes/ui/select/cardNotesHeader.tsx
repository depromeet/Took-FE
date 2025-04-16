'use client';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';

function CardNotesHeader() {
  const handleBack = useHistoryBack();
  return (
    <section>
      <Appbar page="notes" onLeftClick={handleBack} />
    </section>
  );
}

export default CardNotesHeader;
