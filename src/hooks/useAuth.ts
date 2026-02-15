import { useContext, useState } from 'react';
import { Route } from '../routes';
import type { UserType } from '../types/user.type';
import { RouterAuthContext } from '../providers/authProvider';

/**
 * 어플리케이션단에서 사용할 수 있도록 인증 정보를 가져오는 공통 훅
 */
export function useAuth() {
  const context = useContext(RouterAuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
