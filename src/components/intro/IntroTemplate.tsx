import { useEffect, useState, type PropsWithChildren } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const CATCHPHRASE = [
  'Diary와 Our의 합성어',
  '함께 쓰는 일기',
  '다이어리',
  '차차 생각해볼 예정',
];

export const IntroTemplate = ({ children }: PropsWithChildren) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const couter = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      clearInterval(couter);
    };
  }, []);

  return (
    <div className="flex h-full w-full bg-blue-500">
      <div className="flex-3/5 bg-amber-200">
        <p className="absolute bottom-16 left-8 text-6xl font-bold">
          Dioury는
          <br />
          <div className="">
            <TextTransition springConfig={presets.default} inline>
              {CATCHPHRASE[index % CATCHPHRASE.length]}
            </TextTransition>
          </div>
          입니다.
        </p>
      </div>
      <div className="flex flex-col flex-2/5 bg-emerald-200">{children}</div>
    </div>
  );
};
