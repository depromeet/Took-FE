'use client';

import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalErrorFallback } from '../ui/error-boundary/GlobalErrorFallback';

export const GlobalErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary FallbackComponent={GlobalErrorFallback}>{children}</ErrorBoundary>;
};
