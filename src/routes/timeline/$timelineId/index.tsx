import { createFileRoute } from '@tanstack/react-router';
import { ensureTimelineAccess } from '../../-guard';
import { ServiceTemplate } from '../../../components/service/ServiceTemplate';
import { TimelineDetail } from '../../../components/service/timeline/detail';

export const Route = createFileRoute('/timeline/$timelineId/')({
  beforeLoad: ({ context, params, preload }) =>
    ensureTimelineAccess(context, params.timelineId, preload),
  component: RouteComponent,
});

function RouteComponent() {
  const { timelineId } = Route.useParams();

  return (
    <ServiceTemplate>
      <TimelineDetail timelineId={Number(timelineId)} />
    </ServiceTemplate>
  );
}
