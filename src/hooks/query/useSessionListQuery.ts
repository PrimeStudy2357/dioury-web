import { useQuery } from '@tanstack/react-query';
import { requestGetSessionList } from '../../api/session';
import type { GetSessionListParams } from '../../types/session.type';

export const useSessionListQuery = (params: GetSessionListParams) => {
  return useQuery({
    queryKey: ['sessionList', params],
    queryFn: () => requestGetSessionList(params),
  });
};
