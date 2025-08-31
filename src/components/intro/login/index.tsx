import { Link } from '@tanstack/react-router';
import IcoShow from '@/assets/icon/icoShow.svg?react';
import IcoHide from '@/assets/icon/icoHide.svg?react';
import { useState } from 'react';

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="bg-white h-10 pl-2 rounded-xl border-neutral-950"
            placeholder="password"
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
        <Link
          to="/"
          className="flex items-center justify-center w-96 h-20 text-3xl font-bold text-white bg-blue-400"
        >
          로그인
        </Link>
        <div className="flex flex-col w-96 items-end">
          <Link to="/signup">계정이 없으신가요?</Link>
          <Link to="/">비밀번호를 잊었습니까?</Link>
          <Link to="/">뒤로가기</Link>
        </div>
      </div>
    </>
  );
};
