import { Link } from '@tanstack/react-router';

export const Signup = () => {
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
                type="text"
              />
              <p className="text-2xl">@</p>
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="mail"
                type="text"
              />
            </div>
            <button className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400">
              인증요청
            </button>
          </div>
          <div className="flex w-full justify-end">
            <p>{'이미 존재하는 이메일입니다.'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center gap-2">
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="인증번호"
                type="text"
              />
            </div>
            <button className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400">
              인증확인
            </button>
          </div>
          <div className="flex w-full justify-end">
            <p>{'인증 번호가 맞지 않습니다.'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <input
              className="bg-white text-2xl w-full p-1 border-neutral-950"
              placeholder="비밀번호"
              type="password"
            />
          </div>
          <div className="flex w-full justify-end">
            <p>{'영문자/숫자/특수문자 3개 조합, 8자리 이상'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <input
              className="bg-white text-2xl w-full p-1 border-neutral-950"
              placeholder="비밀번호 확인"
              type="password"
            />
          </div>
          <div className="flex w-full justify-end">
            <p>{'비밀번호가 다릅니다.'}</p>
          </div>
        </div>
        <div className="flex flex-col w-full min-w-0 items-center justify-center gap-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center gap-2">
              <input
                className="bg-white text-2xl w-full p-1 border-neutral-950"
                placeholder="닉네임"
                type="text"
              />
            </div>
            <button className="flex items-center justify-center p-1 text-2xl min-w-28 font-bold text-white bg-blue-400">
              중복확인
            </button>
          </div>
          <div className="flex w-full justify-end">
            <p>{'이미 존재하는 닉네임입니다.'}</p>
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
              onClick={() => {
                alert('가입되었습니다.');
                window.location.href = '/login';
              }}
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
