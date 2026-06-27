import APIInstance from '..';
import type { CreateTimelineType } from '../../types/timeline.type';

export const requestCheckTimelineName = async (name: string) => {
  return await APIInstance.get(`/timeline/checkname`, {
    params: { name },
  });
};

export const requestCreateTimeline = async (params: CreateTimelineType) => {
  console.log('🥕', params);
  return await APIInstance.post(`/timeline`, {
    ...params,
  });
};
