'use client';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';

function CardNotesMemoHeader() {
  const handleBack = useHistoryBack();
  return (
    <section className="sticky top-0">
      <Appbar page="notes" onLeftClick={handleBack} />
    </section>
  );
}

export default CardNotesMemoHeader;
