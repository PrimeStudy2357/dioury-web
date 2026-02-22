import { createContext, type ReactNode } from 'react';
import type { UserType } from '../types/user.type';
import { useWhoAmIQuery } from '../hooks/query/useWhoAmIQuery';
import { useQueryClient } from '@tanstack/react-query';

export interface RouterAuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}

export const RouterAuthContext = createContext<RouterAuthContextType | null>(
  null,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useWhoAmIQuery();
  const queryClient = useQueryClient();

  const isAuthenticated = !!user;

  const login = () => {
    queryClient.invalidateQueries({ queryKey: ['whoAmI'] });
  };
  const logout = () => {
    queryClient.setQueryData(['whoAmI'], null);
  };

  if (isLoading) return null;

  return (
    <RouterAuthContext.Provider
      value={{ isAuthenticated, login, logout, user: user ?? null }}
    >
      {children}
    </RouterAuthContext.Provider>
  );
}
