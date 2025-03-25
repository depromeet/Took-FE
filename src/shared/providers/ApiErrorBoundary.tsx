// src/shared/providers/error-boundary/ApiErrorBoundary.tsx
'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ApiErrorFallback } from '../ui/error-boundary/apiErrorFallback';

export const ApiErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ApiErrorFallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
