import { createFileRoute } from '@tanstack/react-router';
import { ServiceTemplate } from '../../../components/service/ServiceTemplate';
import { TimelineCreate } from '../../../components/service/timeline/create';

export const Route = createFileRoute('/timeline/create/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceTemplate>
      <TimelineCreate />
    </ServiceTemplate>
  );
}
