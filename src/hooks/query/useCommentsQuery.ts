import { useQuery } from '@tanstack/react-query';
import { requestGetComments } from '../../api/session';

export const commentsQueryKey = (sessionId: number) => ['comments', sessionId];

export const useCommentsQuery = (sessionId: number) => {
  return useQuery({
    queryKey: commentsQueryKey(sessionId),
    queryFn: () => requestGetComments(sessionId),
  });
};
