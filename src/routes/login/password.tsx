import { IntroTemplate } from '@/components/intro/IntroTemplate';
import { FindPW } from '../../components/intro/password';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <IntroTemplate>
      <FindPW />
    </IntroTemplate>
  );
}
