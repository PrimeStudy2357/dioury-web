import { createFileRoute } from '@tanstack/react-router';
import { IntroTemplate } from '../../components/intro/IntroTemplate';
import { Signup } from '../../components/intro/signup';

export const Route = createFileRoute('/signup/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <IntroTemplate>
      <Signup />
    </IntroTemplate>
  );
}
