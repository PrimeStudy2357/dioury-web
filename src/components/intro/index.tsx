import { Link } from '@tanstack/react-router';

export const Intro = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-1/2">
        <p className="text-8xl font-bold">Dioury</p>
      </div>
      <div className="flex gap-4 justify-center items-center flex-col flex-1/2">
        <Link
          to="/login"
          className="flex items-center justify-center w-96 h-20 text-3xl font-bold text-white bg-red-400"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="flex items-center justify-center w-96 h-20 text-3xl font-bold text-white bg-blue-400"
        >
          회원가입
        </Link>
      </div>
    </>
  );
};
