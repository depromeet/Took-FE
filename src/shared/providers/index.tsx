'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { GlobalErrorBoundaryProvider } from './GlobalErrorBoundary';
import { QueryClientProvider } from './QueryClientProvider';
import { ApiErrorBoundaryProvider } from './ApiErrorBoundary';

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
