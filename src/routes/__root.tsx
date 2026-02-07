import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { UserType } from '../types/user.type';

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (user: UserType) => void;
    logout: () => void;
  };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
