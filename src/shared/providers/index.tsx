'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { QueryClientProvider } from './QueryClientProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
