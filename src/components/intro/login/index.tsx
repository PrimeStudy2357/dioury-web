import { Link } from '@tanstack/react-router';
import IcoShow from '@/assets/icon/icoShow.svg?react';
import IcoHide from '@/assets/icon/icoHide.svg?react';
import { useState } from 'react';
import { requestSignIn } from '../../../api/signin';
import { isAxiosError } from 'axios';

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickLogin = async () => {
    if (isLoading) {
      return;
    }

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    // 로그인 API 호출
    setIsLoading(true);
    try {
      await requestSignIn({ email, password });
      window.location.href = '/';
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        alert(error.response?.data?.message);
      } else {
        alert('로그인에 실패하였습니다.');
        console.error('로그인 중 원인을 알 수 없는 오류가 발생하였습니다. :: ');
        console.error(error);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-1/2">
        <p className="text-8xl font-bold">로그인</p>
      </div>
      <div className="flex gap-4 justify-center items-center flex-col flex-1/2">
        <div className="relative flex flex-col w-96 gap-4">
          <input
            className="bg-white h-10 pl-2 rounded-xl border-neutral-950"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="bg-white h-10 pl-2 rounded-xl border-neutral-950"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute bottom-2 right-3"
            onClick={() => {
              setIsPasswordVisible((prev) => !prev);
            }}
          >
            {isPasswordVisible ? (
              <IcoHide className="w-6 h-6 gray" />
            ) : (
              <IcoShow className="w-6 h-6 gray" />
            )}
          </button>
        </div>
        <button
          onClick={handleClickLogin}
          className="flex items-center justify-center w-96 h-20 text-3xl font-bold text-white bg-blue-400"
        >
          로그인
        </button>
        <div className="flex flex-col w-96 items-end">
          <Link to="/signup">계정이 없으신가요?</Link>
          <Link to="/login/password">비밀번호를 잊었습니까?</Link>
          <Link to="/">뒤로가기</Link>
        </div>
      </div>
    </>
  );
};
