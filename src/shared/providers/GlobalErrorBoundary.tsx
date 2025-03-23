// src/shared/providers/error-boundary/GlobalErrorBoundary.tsx
'use client';

import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalErrorFallback } from '@/shared/ui/error-boundary/GlobalErrorFallback';

export const GlobalErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onError={(error) => {
        // 글로벌 에러 로깅 (예: Sentry, Google Analytics 등)
        console.error('Global error:', error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
