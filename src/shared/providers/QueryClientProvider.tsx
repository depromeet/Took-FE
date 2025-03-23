import { isServer, QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        throwOnError: true,
      },
    },
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
