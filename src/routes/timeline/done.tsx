import { createFileRoute } from '@tanstack/react-router';
import { ServiceTemplate } from '../../components/service/ServiceTemplate';

export const Route = createFileRoute('/timeline/done')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ServiceTemplate></ServiceTemplate>;
}
