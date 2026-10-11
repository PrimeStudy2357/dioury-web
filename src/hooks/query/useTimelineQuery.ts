import { queryOptions, useQuery } from '@tanstack/react-query';
import { requestGetTimeline } from '../../api/timeline';

export const timelineQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['timeline', id],
    queryFn: () => requestGetTimeline(id),
    // beforeLoad에서 받은 데이터를 화면 mount 시 다시 요청하지 않도록
    staleTime: 10_000,
  });

export const useTimelineQuery = (id: number) => {
  return useQuery(timelineQueryOptions(id));
};
