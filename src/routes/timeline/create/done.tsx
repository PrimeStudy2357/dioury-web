import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/timeline/create/done')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/timeline/create/done"!</div>;
}
