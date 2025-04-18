'use client';

import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalErrorFallback } from '../ui/error-boundary/GlobalErrorFallback';
import LottieLoading from '../ui/lottieLoading';

export const GlobalErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Suspense fallback={<LottieLoading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
