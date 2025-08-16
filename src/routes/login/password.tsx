import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/login/password"!</div>;
}
