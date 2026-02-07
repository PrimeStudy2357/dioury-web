import { createFileRoute, redirect } from '@tanstack/react-router';
import { IntroTemplate } from '../components/intro/IntroTemplate';
import { Intro } from '../components/intro';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/timeline',
        replace: true,
      });
    }
  },
  component: App,
});

function App() {
  return (
    <IntroTemplate>
      <Intro />
    </IntroTemplate>
  );
}
