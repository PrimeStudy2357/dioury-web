import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export const Route = createFileRoute('/timeline/')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  return <div>Hello {auth.user?.nickname}!!!</div>;
}
