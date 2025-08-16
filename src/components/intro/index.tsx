import { useEffect, useMemo, useState } from 'react';

const CATCHPHRASE = ['Diary와 Our의 합성어', '함께 쓰는 일기'];

export const IntroTemplate = () => {
  const [index, setIndex] = useState(0);
  const currentCatchphrase = useMemo(() => {
    return CATCHPHRASE[index];
  }, [index]);

  useEffect(() => {
    const couter = setInterval(() => {
      setIndex((prev) => {
        const newIndex = prev + 1;
        return newIndex >= CATCHPHRASE.length ? 0 : newIndex;
      });
    }, 5000);

    return () => {
      clearInterval(couter);
    };
  }, []);

  return (
    <div className="flex h-full w-full bg-blue-500">
      <div className="flex-3/5 bg-amber-200">
        <p className="absolute bottom-16 left-8 text-6xl font-bold">
          Dioury는 <br />
          {currentCatchphrase} <br />
          입니다.
        </p>
      </div>
      <div className="flex flex-col flex-2/5 bg-emerald-200">
        <div className="flex justify-center items-center flex-1/2">
          <p className="text-8xl font-bold">Dioury</p>
        </div>
        <div className="flex gap-4 justify-center items-center flex-col flex-1/2">
          <button className="w-96 h-20 text-3xl font-bold text-white bg-red-400">
            로그인
          </button>
          <button className="w-96 h-20 text-3xl font-bold text-white bg-blue-400">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
