import { createContext, type ReactNode } from 'react';
import type { UserType } from '../types/user.type';
import { useWhoAmIQuery } from '../hooks/query/useWhoAmIQuery';
import { useQueryClient } from '@tanstack/react-query';
import { requestSignOut } from '../api/signin';

export interface RouterAuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => Promise<void>;
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
  const logout = async () => {
    await requestSignOut();
    // 이전 사용자의 캐시(타임라인 등급 등)를 명시적으로 비운다
    queryClient.clear();
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
