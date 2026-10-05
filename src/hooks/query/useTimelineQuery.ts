import { queryOptions, useQuery } from '@tanstack/react-query';
import { requestGetTimeline } from '../../api/timeline';

export const timelineQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['timeline', id],
    queryFn: () => requestGetTimeline(id),
  });

export const useTimelineQuery = (id: number) => {
  return useQuery(timelineQueryOptions(id));
};
