import { QueryClient, useQuery } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { client } from '@/shared/apis/client';
import { server } from '@/shared/apis/server';
import { CLIENT_SIDE_URL } from '@/shared/constants';

export const SAMPLE_QUERY_KEY = 'SAMPLE_QUERY_KEY';

const getClientSideSampleFunc = async (params: any) => {
  const data = await client.get<any>(`${CLIENT_SIDE_URL}`, {
    params,
  });

  return data;
};

export const useSampleQuery = (params: any) => {
  return useQuery({
    queryKey: [SAMPLE_QUERY_KEY, params],
    queryFn: () => getClientSideSampleFunc(params),
  });
};

const getServerSideSampleFunc = async (params: any, cookie: ReadonlyRequestCookies) => {
  const data = await server.get<any>(`${CLIENT_SIDE_URL}`, {
    params,
    headers: {
      Cookie: cookie?.toString(),
    },
  });

  return data;
};

export const getSamplePrefetch = (params: any, queryClient: QueryClient, cookie: ReadonlyRequestCookies) => {
  const prefetch = queryClient.prefetchQuery({
    queryKey: [SAMPLE_QUERY_KEY, params],
    queryFn: () => getServerSideSampleFunc(params, cookie),
  });

  return prefetch;
};
