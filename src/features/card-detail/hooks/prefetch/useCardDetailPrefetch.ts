// import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// import { server } from '@/shared/apis/server';
// import { SERVER_SIDE_URL } from '@/shared/constants';
// import { getQueryClient } from '@/shared/providers/QueryClientProvider';

// import { CARD_DETAIL_QUERY_KEY } from '../query/useCardDetailQuery';

// const _getCardDetailPrefetch = async (cardId: string, cookie: ReadonlyRequestCookies) => {
//   const data = await server.get<any>(`${SERVER_SIDE_URL}/api/card/detail?cardId=${cardId}`, {
//     headers: {
//       Cookie: cookie?.toString(),
//     },
//     params: cardId,
//   });

//   return data;
// };

// export const getCardDetailPrefetch = (cookie: ReadonlyRequestCookies, params: string) => {
//   const queryClient = getQueryClient();

//   queryClient.prefetchQuery({
//     queryKey: [CARD_DETAIL_QUERY_KEY],
//     queryFn: () => _getCardDetailPrefetch(params, cookie),
//   });

//   return {
//     queryClient,
//   };
// };
