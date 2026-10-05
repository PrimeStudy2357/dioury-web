import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import type { RouterAuthContextType } from '../providers/authProvider';

export const Route = createRootRouteWithContext<
  RouterAuthContextType & { queryClient: QueryClient }
>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
