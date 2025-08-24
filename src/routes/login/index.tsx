import { createFileRoute } from '@tanstack/react-router';
import { IntroTemplate } from '../../components/intro/IntroTemplate';
import { Login } from '../../components/intro/login';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <IntroTemplate>
      <Login />
    </IntroTemplate>
  );
}
