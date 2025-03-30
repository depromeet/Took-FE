/* eslint-disable react-hooks/rules-of-hooks */
import { isServer, QueryCache, QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import handleAxiosError from '../utils/handleAxiosError';

const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => handleAxiosError(error),
    }),
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return generateQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = generateQueryClient();
  }

  return browserQueryClient;
};

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
};
