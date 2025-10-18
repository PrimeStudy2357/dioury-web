import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const FindPW = () => {
  const [email, setEmail] = useState('');

  return (
    <>
      <div className="flex justify-center items-center flex-1/2">
        <p className="text-8xl font-bold text-center">
          비밀번호<br></br>찾기
        </p>
      </div>
      <div className="flex gap-4 justify-center items-center flex-col flex-1/2">
        <div className="relative flex flex-col w-96 gap-4">
          <input
            className="bg-white h-10 pl-2 rounded-xl border-neutral-950"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <button
          className="flex items-center justify-center w-96 h-20 text-3xl font-bold text-white bg-blue-400"
          onClick={() => {
            alert(`${email} 주소로 메일을 보냈습니다.`);
          }}
        >
          메일 보내기
        </button>
        <div className="flex flex-col w-96 items-end">
          <Link to="/login">뒤로가기</Link>
        </div>
      </div>
    </>
  );
};
