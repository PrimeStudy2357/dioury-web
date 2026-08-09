import { createFileRoute } from '@tanstack/react-router';
import { ServiceTemplate } from '../../../components/service/ServiceTemplate';
import { TimelineDetail } from '../../../components/service/timeline/detail';

export const Route = createFileRoute('/timeline/$timelineId/')({
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
