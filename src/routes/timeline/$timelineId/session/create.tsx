import { createFileRoute } from '@tanstack/react-router';
import { ServiceTemplate } from '../../../../components/service/ServiceTemplate';
import { SessionCreate } from '../../../../components/service/session/create';

export const Route = createFileRoute('/timeline/$timelineId/session/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceTemplate>
      <SessionCreate />
    </ServiceTemplate>
  );
}
