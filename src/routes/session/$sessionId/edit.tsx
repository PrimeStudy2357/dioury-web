import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/session/$sessionId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/session/$sessionId/edit"!</div>;
}
