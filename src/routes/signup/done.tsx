import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup/done')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/signup/done"!</div>;
}
