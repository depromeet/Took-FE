import { QueryClient } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { server } from '@/shared/apis/server';

import { CARD_QUERY_KEY } from '../queries/useCardQuery';

const _getCardPrefetch = async (params: any, cookie: ReadonlyRequestCookies) => {
  const data = await server.get<any>('/somewhere/server-side', {
    params,
    headers: {
      Cookie: cookie?.toString(),
    },
  });

  return data;
};

export const getCardPrefetch = (params: any, queryClient: QueryClient, cookie: ReadonlyRequestCookies) => {
  return queryClient.prefetchQuery({
    queryKey: [CARD_QUERY_KEY, params],
    queryFn: () => _getCardPrefetch(params, cookie),
  });
};
