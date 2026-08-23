import { useTimelineQuery } from '../../../../hooks/query/useTimelineQuery';
import { SessionList } from './sessionList';
import { SubHeader } from './SubHeader';

interface TimelineDetailProps {
  timelineId: number;
}

export const TimelineDetail = ({ timelineId }: TimelineDetailProps) => {
  const { data: timeline } = useTimelineQuery(timelineId);

  if (!timeline) {
    return null;
  }

  return (
    <>
      <SubHeader timeline={timeline} />
      <SessionList timelineId={timelineId} sessions={[]} />
    </>
  );
};
