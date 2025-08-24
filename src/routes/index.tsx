import { createFileRoute } from '@tanstack/react-router';
import { IntroTemplate } from '../components/intro/IntroTemplate';
import { Intro } from '../components/intro';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <IntroTemplate>
      <Intro />
    </IntroTemplate>
  );
}
