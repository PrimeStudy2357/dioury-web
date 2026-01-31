import APIInstance from '..';
import type { SignInType } from '../../types/user.type';

/**
 * 로그인 요청을 보낸다.
 */
export const requestSignIn = async (data: SignInType) => {
  return await APIInstance.post('/signin', data);
};
