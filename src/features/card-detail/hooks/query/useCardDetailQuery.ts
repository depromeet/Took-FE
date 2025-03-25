// api/cardQueries.ts
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { CardDetailDto } from '../../types/cardDetail';

// API 호출 함수

export const CARD_DETAIL_QUERY_KEY = 'cardDetail';

const getCardDetail = async (cardId: number): Promise<CardDetailDto> => {
  // 각 cardId 값에 따라 다른 상태 코드의 에러 테스트
  if (cardId === 400) {
    // AxiosError 형식에 맞춰 에러 객체 생성
    const error = new Error('잘못된 요청 형식입니다.') as any;
    error.isAxiosError = true;
    error.response = {
      status: 400,
      data: { message: '잘못된 요청 형식입니다.' },
    };
    error.status = 400;
    throw error;
  }

  if (cardId === 401) {
    const error = new Error('인증이 필요합니다.') as any;
    error.isAxiosError = true;
    error.response = {
      status: 401,
      data: { message: '로그인 세션이 만료되었습니다.' },
    };
    error.status = 401;
    throw error;
  }

  if (cardId === 403) {
    const error = new Error('접근 권한이 없습니다.') as any;
    error.isAxiosError = true;
    error.response = {
      status: 403,
      data: { message: '해당 카드에 접근할 권한이 없습니다.' },
    };
    error.status = 403;
    throw error;
  }

  if (cardId === 500) {
    const error = new Error('서버 내부 오류') as any;
    error.isAxiosError = true;
    error.response = {
      status: 500,
      data: { message: '서버에서 오류가 발생했습니다.' },
    };
    error.status = 500;
    throw error;
  }

  try {
    const data = await client.get<CardDetailDto>(`${CLIENT_SIDE_URL}/api/card/detail?cardId=${cardId}`);
    return data;
  } catch (err) {
    // 실제 axios 에러에도 status 필드 추가
    if (axios.isAxiosError(err) && err.response) {
      (err as any).status = err.response.status;
    }
    throw err;
  }
};
// 내 명함 목록 조회
const getMyCard = async (): Promise<MyCardDto> => {
  const data = await client.get<MyCardDto>(`${CLIENT_SIDE_URL}/api/card/my`);
  return data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: number) => {
  const data = useSuspenseQuery({
    queryKey: [CARD_DETAIL_QUERY_KEY, cardId],
    queryFn: () => getCardDetail(cardId),
  });

  return data;
};

// 내 명함 목록 조회
export const useMyCardQuery = () => {
  const data = useQuery({
    queryKey: ['myCard'],
    queryFn: () => getMyCard(),
  });

  return data;
};
