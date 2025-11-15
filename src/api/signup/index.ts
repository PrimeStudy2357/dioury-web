import APIInstance from '..';
import type { SignUpType } from '../../types/user.type';

/**
 * 회원가입 요청을 보낸다.
 */
export const requestSignUp = async (data: SignUpType) => {
  return await APIInstance.post('/signup', data);
};
