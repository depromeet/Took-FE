import { Suspense } from 'react';

import { MultiStepFormView } from '@/features/multi-step-form';

function MutliStepFormPage() {
  return (
    <Suspense>
      <MultiStepFormView />
    </Suspense>
  );
}

export default MutliStepFormPage;
