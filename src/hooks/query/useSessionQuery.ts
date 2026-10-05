import { queryOptions, useQuery } from '@tanstack/react-query';
import { requestGetSession } from '../../api/session';

export const sessionQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['session', id],
    queryFn: () => requestGetSession(id),
  });

export const useSessionQuery = (id: number) => {
  return useQuery(sessionQueryOptions(id));
};
