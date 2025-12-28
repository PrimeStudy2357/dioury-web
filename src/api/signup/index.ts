import APIInstance from '..';
import type { SignUpType } from '../../types/user.type';

/**
 * 회원가입 요청을 보낸다.
 */
export const requestSignUp = async (data: SignUpType) => {
  return await APIInstance.post('/signup', data);
};

/**
 * 회원가입 이메일 인증 요청을 보낸다.
 */
export const requestEmailAuth = async (email: string) => {
  return await APIInstance.post('/signup/authEmail', { email: email });
};

/**
 * 인증번호 확인 요청을 보낸다.
 */
export const requestAuthCheck = async (email: string, code: string) => {
  return await APIInstance.post('/signup/authEmailCheck', {
    email: email,
    code: code,
  });
};
