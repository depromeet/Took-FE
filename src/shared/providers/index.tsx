'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { GlobalErrorBoundaryProvider } from './GlobalErrorBoundary';
import { QueryClientProvider } from './QueryClientProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <GlobalErrorBoundaryProvider>
      <QueryClientProvider>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GlobalErrorBoundaryProvider>
  );
};
