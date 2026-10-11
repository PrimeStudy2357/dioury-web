import { queryOptions, useQuery } from '@tanstack/react-query';
import { requestGetSession } from '../../api/session';

export const sessionQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['session', id],
    queryFn: () => requestGetSession(id),
    // beforeLoad에서 받은 데이터를 화면 mount 시 다시 요청하지 않도록
    staleTime: 10_000,
  });

export const useSessionQuery = (id: number) => {
  return useQuery(sessionQueryOptions(id));
};
