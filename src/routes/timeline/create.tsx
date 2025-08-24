import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/timeline/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/timeline/create"!</div>;
}
