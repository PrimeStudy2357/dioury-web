import React, { useState } from 'react';
import { ParticipantInput } from './ParticipantInput';

export const SessionCreate = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center mt-8">
      <form
        className="flex-1 min-w-[840px] max-w-[1440px]"
        onSubmit={handleSubmit}
      >
        <div className="pt-8 px-6 flex flex-col gap-6">
          <input
            name="title"
            placeholder="제목을 입력하세요"
            className="text-4xl font-bold outline-none w-full"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <input
                name="location"
                placeholder="모임 장소"
                className="border-2 px-4 py-2 text-xl w-64"
              />
              <input
                type="date"
                name="date"
                className="border-2 px-4 py-2 text-xl"
              />
              <input
                type="time"
                name="time"
                className="border-2 px-4 py-2 text-xl"
              />
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              onClick={() => setIsPublic(!isPublic)}
              className="cursor-pointer flex items-center gap-3 text-2xl font-bold"
            >
              <span>{isPublic ? '공개' : '비공개'}</span>
              <span
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isPublic ? 'bg-black' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </span>
            </button>
          </div>
          <ParticipantInput name="participants" />
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            className="border-2 w-full h-96 p-4 text-xl"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer bg-black text-white px-10 py-1 text-3xl font-bold"
            >
              작성 완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
