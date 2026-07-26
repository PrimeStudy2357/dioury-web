import { useQuery } from '@tanstack/react-query';
import { requestGetRecommendedTimelines } from '../../api/timeline';
import type { GetTimelineListParams } from '../../types/timeline.type';

export const useRecommendedTimelinesQuery = (params: GetTimelineListParams) => {
  return useQuery({
    queryKey: ['recommendedTimelines', params],
    queryFn: () => requestGetRecommendedTimelines(params),
  });
};
