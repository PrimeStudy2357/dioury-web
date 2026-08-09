import APIInstance from '..';
import type {
  CreateTimelineType,
  GetTimelineListParams,
  TimelinePaginationType,
  TimelineType,
} from '../../types/timeline.type';

type TimelineApiEntity = Omit<TimelineType, 'keywords'> & {
  keyword1: string;
  keyword2: string | null;
  keyword3: string | null;
};

type GetRecommendedTimelinesRawResponse = {
  success: boolean;
  data: TimelineApiEntity[];
  pagination: TimelinePaginationType;
};

const toTimelineType = ({
  keyword1,
  keyword2,
  keyword3,
  ...rest
}: TimelineApiEntity): TimelineType => ({
  ...rest,
  keywords: [keyword1, keyword2, keyword3].filter(
    (keyword): keyword is string => Boolean(keyword),
  ),
});

export const requestCheckTimelineName = async (name: string) => {
  return await APIInstance.get(`/timeline/checkname`, {
    params: { name },
  });
};

export const requestCreateTimeline = async (params: CreateTimelineType) => {
  return await APIInstance.post(`/timeline`, {
    ...params,
  });
};

export const requestGetRecommendedTimelines = async (
  params: GetTimelineListParams,
) => {
  const { data } = await APIInstance.get<GetRecommendedTimelinesRawResponse>(
    `/timeline`,
    { params },
  );

  return {
    timelines: data.data.map(toTimelineType),
    pagination: data.pagination,
  };
};
