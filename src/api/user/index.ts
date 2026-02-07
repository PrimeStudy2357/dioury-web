import APIInstance from '..';
import type { UserType } from '../../types/user.type';

/**
 * 닉네임 중복 확인 요청을 보낸다.
 */
export const requestCheckNickname = async (nickname: string) => {
  return await APIInstance.get(`/users/checkNickname`, {
    params: { nickname },
  });
};

/**
 * 쿠키값의 세션 정보를 가지고 로그인 한 사용자의 정보를 불러온다.
 */
export const requestWhoAmI = async () => {
  return {
    nickname: 'anteater1056',
    email: 'anteater1056@gmail.com',
  } as UserType;
  // return await APIInstance.get(`/users/whoami`);
};
