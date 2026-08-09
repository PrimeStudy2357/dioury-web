import { useQuery } from '@tanstack/react-query';
import { requestGetTimeline } from '../../api/timeline';

export const useTimelineQuery = (id: number) => {
  return useQuery({
    queryKey: ['timeline', id],
    queryFn: () => requestGetTimeline(id),
  });
};
