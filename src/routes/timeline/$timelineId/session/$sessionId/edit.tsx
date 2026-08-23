import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/timeline/$timelineId/session/$sessionId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/timeline/$timelineId/session/$sessionId/edit"!</div>;
}
