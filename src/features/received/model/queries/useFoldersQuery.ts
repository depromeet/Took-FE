import { useQuery } from '@tanstack/react-query';

import { FolderDto } from '@/entities/folder/dto';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

export const FOLDER_QUERY_KEY = 'FOLDER_QUERY_KEY';

const _getFolders = async () => {
  try {
    const { data } = await client.get<FolderDto>(`${CLIENT_SIDE_URL}/api/card/folders`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFoldersQuery = () => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [FOLDER_QUERY_KEY],
    queryFn: _getFolders,
    enabled: true,
  });
  return { folders: data?.folders ?? [], isLoading, isFetching, isError, refetch };
};
