import { useQuery } from '@tanstack/react-query';
import { requestGetTimelineMembers } from '../../api/timeline';
import type { GetTimelineMembersParams } from '../../types/timeline.type';

export const useTimelineMembersQuery = (
  timelineId: number,
  params: GetTimelineMembersParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['timelineMembers', timelineId, params],
    queryFn: () => requestGetTimelineMembers(timelineId, params),
    enabled,
  });
};
