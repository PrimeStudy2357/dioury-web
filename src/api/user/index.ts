import APIInstance from '..';

/**
 * 닉네임 중복 확인 요청을 보낸다.
 */
export const requestCheckNickname = async (nickname: string) => {
  return await APIInstance.get(`/users/checkNickname`, {
    params: { nickname },
  });
};
