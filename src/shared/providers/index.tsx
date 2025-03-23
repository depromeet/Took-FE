'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { ApiErrorBoundaryProvider } from './ApiErrorBoundary';
import { GlobalErrorBoundaryProvider } from './GlobalErrorBoundary';
import { QueryClientProvider } from './QueryClientProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <GlobalErrorBoundaryProvider>
      <QueryClientProvider>
        <ApiErrorBoundaryProvider>{children}</ApiErrorBoundaryProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GlobalErrorBoundaryProvider>
  );
};
