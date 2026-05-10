import { createFileRoute } from '@tanstack/react-router';
import { ServiceTemplate } from '../../components/service/ServiceTemplate';
import { Timeline } from '../../components/service/timeline';

export const Route = createFileRoute('/timeline/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceTemplate>
      <Timeline />
    </ServiceTemplate>
  );
}
