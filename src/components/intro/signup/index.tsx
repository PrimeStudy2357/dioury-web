import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import {
  requestAuthCheck,
  requestEmailAuth,
  requestSignUp,
} from '../../../api/signup';
import { isAxiosError } from 'axios';

const checkValidPassword = (input: string) => {
  // 영문자, 숫자, 특수문자 포함 + 8자리 이상
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(input);
};

const checkNicknameLength = (input: string) => {
  // 2자리 이상 8자리 이하
  return input.length > 1 && input.length <= 8;
};

export const Signup = () => {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [isAuthRequested, setIsAuthRequested] = useState(false);
  const [mailInputMsg, setMailInputMsg] = useState('');
  const [authCheckMsg, setAuthCheckMsg] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isAuthOk, setIsAuthOk] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [validNicknameMsg, setValidNicknameMsg] = useState(
    '최소 2글자 이상 최대 8글자 이하',
  );
  const [isUnique, setIsUnique] = useState(false);
  const [funnel, setFunnel] = useState('');
  const [purpose, setPurpose] = useState('');
  const [purposeDetail, setPurposeDetail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(true);
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // 패스워드 상태 변경
      const newVal = event.target.value;
      setPassword(newVal);
      // 패스워드 유효성 체크
      setIsValidPassword(checkValidPassword(newVal));
    },
    [],
  );

  const [isPasswordChecked, setIsPasswordChecked] = useState(true);
  const handleChangePasswordCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // 패스워드 확인 상태 변경
      const newVal = event.target.value;
      setPasswordCheck(newVal);
      // 비밀번호 동일 여부 체크
      setIsPasswordChecked(newVal === password);
    },
    [password],
  );

  const handleChangeNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // 닉네임 상태 변경
      const newVal = event.target.value;
      setNickname(newVal);
      setIsUnique(false);

      // 닉네임 길이 체크
      const isValid = checkNicknameLength(newVal);
      if (!isValid) {
        setIsValidNickname(false);
        setValidNicknameMsg('최소 2글자 이상 최대 8글자 이하');
      } else {
        setIsValidNickname(true);
        setValidNicknameMsg('');
      }
    },
    [],
  );

  /** 인증요청 버튼 클릭 시 */
  const handleMailAuthRequested = async () => {
    if (isLoading) {
      return;
    }

    if (!emailId || !emailDomain) {
      // 이메일 필드 입력 여부 확인
      return;
    }

    if (isAuthRequested) {
      return;
    }

    try {
      setIsLoading(true);
      await requestEmailAuth(`${emailId}@${emailDomain}`);
      const resultMsg = '인증 요청 메일이 발송되었습니다.';

      setIsAuthRequested(true);
      setMailInputMsg(resultMsg);
    } catch (error) {
      let resultMsg = '';
      if (isAxiosError(error) && error.response?.data?.message) {
        resultMsg = error.response?.data?.message;
      } else {
        resultMsg = '인증 요청에 실패하였습니다.';
        console.error(
          '인증 요청 중 원인을 알 수 없는 오류가 발생하였습니다. :: ',
        );
        console.error(error);
      }

      setIsAuthRequested(false);
      setMailInputMsg(resultMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /** 인증 확인 버튼 클릭 시 */
  const handleAuthCheck = async () => {
    if (isLoading) {
      return;
    }

    if (!isAuthRequested || isAuthOk) {
      return;
    }

    try {
      setIsLoading(true);
      await requestAuthCheck(`${emailId}@${emailDomain}`, authCode);

      setAuthCheckMsg('인증 완료하였습니다.');
      setIsAuthOk(true);
    } catch (error) {
      let resultMsg = '';
      if (isAxiosError(error) && error.response?.data?.message) {
        resultMsg = error.response?.data?.message;
      } else {
        resultMsg = '인증 번호 확인에 실패하였습니다.';
        console.error(
          '인증 번호 확인 중 원인을 알 수 없는 오류가 발생하였습니다. :: ',
        );
        console.error(error);
      }

      setAuthCheckMsg(resultMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /** 닉네임 중복 확인 클릭 시 */
  const handleCheckNickname = () => {
    if (!isValidNickname || !nickname) {
      return;
    }

    try {
      const resultMsg = '사용 가능한 닉네임입니다.';

      setValidNicknameMsg(resultMsg);
      setIsUnique(true);
    } catch (error) {}
  };

  /**
   * 현재 사용자의 입력이 요청 가능한지 확인한다.
   */
  const checkRequestable = () => {
    if (!emailId || !emailDomain) {
      // 이메일 필드 입력 여부 확인
      return false;
    }

    if (!isAuthOk) {
      // 인증확인 통과 여부 확인
      return false;
    }

    if (!password || !passwordCheck || !isValidPassword || !isPasswordChecked) {
      // 비밀번호 필드 입력 여부 확인
      return false;
    }

    if (!nickname || !isValidNickname || !isUnique) {
      // 유효 닉네임 입력 확인
      return false;
    }

    return true;
  };

  const handleClickSignUp = async () => {
    if (isLoading) {
      return;
    }
    const isRequestable = checkRequestable();
    if (!isRequestable) {
      alert('입력을 확인해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      await requestSignUp({
        email: `${emailId}@${emailDomain}`,
        password: password,
        nickname: nickname,
        funnel: funnel === '' ? 'TBD' : funnel,
        purpose: purpose === '' ? 'TBD' : purpose,
      });
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        alert(error.response?.data?.message);
      } else {
        alert('가입 요청에 실패하였습니다.');
        console.error(
          '가입 요청 중 원인을 알 수 없는 오류가 발생하였습니다. :: ',
        );
        console.error(error);
      }
      setIsLoading(false);
      return;
    }

    alert('가입되었습니다.');
    window.location.href = '/login';
  };

  return (
    <>
      <div className="flex flex-1/2 justify-center items-center">
        <p className="text-8xl font-bold">회원가입</p>
      </div>
      <div className="flex flex-col justify-end max-w-4/5 self-center gap-2 pb-4">
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center gap-2">
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="id"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                type="text"
                disabled={isAuthRequested}
              />
              <p className="text-2xl">@</p>
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="mail"
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                type="text"
                disabled={isAuthRequested}
              />
            </div>
            <button
              className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400"
              onClick={handleMailAuthRequested}
            >
              인증요청
            </button>
          </div>
          <div className="flex w-full justify-end">{<p>{mailInputMsg}</p>}</div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center gap-2">
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="인증번호"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                type="text"
                disabled={isAuthOk}
              />
            </div>
            <button
              className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400"
              onClick={handleAuthCheck}
            >
              인증확인
            </button>
          </div>
          <div className="flex w-full justify-end">
            <p>{authCheckMsg}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <input
              className="bg-white text-2xl w-full p-1 border-neutral-950"
              placeholder="비밀번호"
              value={password}
              onChange={handleChangePassword}
              type="password"
            />
          </div>
          <div
            className={clsx(
              `flex w-full justify-end`,
              !isValidPassword && 'text-red-500',
            )}
          >
            <p>{'영문자/숫자/특수문자 3개 조합, 8자리 이상'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <input
              className="bg-white text-2xl w-full p-1 border-neutral-950"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={handleChangePasswordCheck}
              type="password"
            />
          </div>
          <div className="flex w-full justify-end text-red-500">
            <p>{!isPasswordChecked && '비밀번호가 다릅니다.'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center gap-2">
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="닉네임"
                value={nickname}
                onChange={handleChangeNickname}
                type="text"
              />
            </div>
            <button
              className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400"
              onClick={handleCheckNickname}
            >
              중복확인
            </button>
          </div>
          <div
            className={clsx(
              'flex w-full justify-end',
              !isValidNickname && 'text-red-500',
            )}
          >
            <p>{validNicknameMsg}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <select className="bg-white text-2xl w-full p-1 border-neutral-950">
              <option disabled hidden selected>
                유입경로
              </option>
              <option>광고</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <select className="bg-white text-2xl w-full p-1 border-neutral-950">
              <option disabled hidden selected>
                사용목적
              </option>
              <option>모임</option>
            </select>
            <input
              disabled
              className="bg-white text-2xl w-full p-1 border-neutral-950"
              placeholder="기타 사유"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between mt-8">
            <button
              onClick={handleClickSignUp}
              className="flex items-center justify-center w-full p-1 text-2xl font-bold text-white bg-blue-400"
            >
              가입
            </button>
          </div>
          <div className="flex w-full justify-end">
            <Link to="/">돌아가기</Link>
          </div>
        </div>
      </div>
    </>
  );
};
