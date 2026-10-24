import { useQuery } from '@tanstack/react-query';
import { requestGetReactions } from '../../api/session';

export const reactionsQueryKey = (sessionId: number) => [
  'reactions',
  sessionId,
];

export const useReactionsQuery = (sessionId: number) => {
  return useQuery({
    queryKey: reactionsQueryKey(sessionId),
    queryFn: () => requestGetReactions(sessionId),
  });
};
