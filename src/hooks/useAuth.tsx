import { Route } from '../routes';

/**
 * 어플리케이션단에서 사용할 수 있도록 인증 정보를 가져오는 공통 훅
 */
export function useAuth() {
  const { auth } = Route.useRouteContext();

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    login: auth.login,
    logout: auth.logout,
  };
}
