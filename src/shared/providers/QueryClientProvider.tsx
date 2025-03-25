/* eslint-disable react-hooks/rules-of-hooks */
import { isServer, QueryCache, QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import useApiError from '../hooks/useApiError';

const generateQueryClient = (handleError: (error: unknown) => void) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
      mutations: {
        onError: handleError,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  const { handleError } = useApiError();
  if (isServer) {
    return generateQueryClient(handleError);
  }

  if (!browserQueryClient) {
    browserQueryClient = generateQueryClient(handleError);
  }

  return browserQueryClient;
};

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
};
