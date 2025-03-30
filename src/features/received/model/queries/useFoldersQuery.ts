import { useQuery } from '@tanstack/react-query';

import { FolderDto } from '@/entities/folder/dto';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

// import { FOLDERS_MOCK } from '../../config';

export const FOLDER_QUERY_KEY = 'FOLDER_QUERY_KEY';

const _getFolders = async () => {
  try {
    const { data } = await client.get<FolderDto>(`${CLIENT_SIDE_URL}/api/card/folders`);
    console.log('서버로부터 받은 데이터 : ', data); // 추후 지우기
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFoldersQuery = () => {
  const { data, isLoading, isError } = useQuery({
    // const { data: _ } = useQuery({
    queryKey: ['folders'], // 추후 수정
    queryFn: _getFolders,
  });
  return { folders: data?.folders ?? [], isLoading, isError }; // 추후 API 호출을 통해 받은 데이터로 수정

  // return { data: FOLDERS_MOCK };
};
