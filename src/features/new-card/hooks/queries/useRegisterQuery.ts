import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

export type CardJobType = 'DESIGNER' | 'DEVELOPER';

type RegisterQueryParams = {
  job: CardJobType;
};

type CareerType = {
  id: number;
  job: CardJobType;
  detailJobEn: string;
  detailJobKr: string[];
};

type RegisterResponse = {
  careers: CareerType[];
};

export const CARD_REGISTER = 'CARD_REGISTER';

const _getRegister = async (params: RegisterQueryParams) => {
  const data = await client.get<ApiResponseType<RegisterResponse>>(`${CLIENT_SIDE_URL}/api/card/register`, {
    params,
  });

  return data;
};

export const useRegisterQuery = (params: RegisterQueryParams) => {
  return useQuery({
    queryKey: [CARD_REGISTER, params],
    queryFn: () => _getRegister(params),
    enabled: !!params.job,
    select: (data) =>
      data.data.careers.map(({ detailJobEn, id, detailJobKr }) => {
        return {
          id: id,
          label: detailJobEn,
          keywords: detailJobKr,
          value: detailJobEn,
        };
      }),
  });
};
