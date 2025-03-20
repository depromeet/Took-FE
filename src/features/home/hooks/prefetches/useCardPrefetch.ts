import { QueryClient } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { server } from '@/shared/apis/server';

import { MY_CARD_QUERY_KEY } from '../queries/useCardQuery';

const _getCardPrefetch = async (cookie: ReadonlyRequestCookies) => {
  const data = await server.get<any>('/somewhere/server-side', {
    headers: {
      Cookie: cookie?.toString(),
    },
  });

  return data;
};

export const getCardPrefetch = (queryClient: QueryClient, cookie: ReadonlyRequestCookies) => {
  return queryClient.prefetchQuery({
    queryKey: [MY_CARD_QUERY_KEY],
    queryFn: () => _getCardPrefetch(cookie),
  });
};
