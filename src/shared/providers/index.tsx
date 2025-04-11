'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { QueryClientProvider } from './QueryClientProvider';
import { GlobalErrorBoundaryProvider } from './GlobalErrorBoundary';

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
