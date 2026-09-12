import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { Editor } from '../../../common/Editor';
import { ParticipantInput } from './ParticipantInput';
import { requestCreateSession } from '../../../../api/session';
import { useConfirm } from '../../../../hooks/useConfirm';

interface SessionCreateProps {
  timelineId: number;
}

export const SessionCreate = ({ timelineId }: SessionCreateProps) => {
  const [isPublic, setIsPublic] = useState(true);
  const [content, setContent] = useState('');

  const confirm = useConfirm();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('title') as string;
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    const place = formData.get('location') as string;
    if (!place) {
      alert('모임 장소를 입력해주세요.');
      return;
    }

    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    if (!date || !time) {
      alert('날짜와 시간을 입력해주세요.');
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!(await confirm({ title: '세션을 생성하시겠습니까?' }))) {
      return;
    }

    try {
      const { data } = await requestCreateSession({
        timelineId,
        title,
        place,
        date: `${date}T${time}`,
        content,
        isPublic,
      });

      if (
        await confirm({
          title: '세션이 생성되었습니다.',
          confirmText: '세션 보기',
          cancelText: '목록으로',
        })
      ) {
        navigate({
          to: '/timeline/$timelineId/session/$sessionId',
          params: {
            timelineId: String(timelineId),
            sessionId: String(data.data.id),
          },
        });
      } else {
        navigate({
          to: '/timeline/$timelineId',
          params: { timelineId: String(timelineId) },
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message ?? '세션 생성 중 오류가 발생했습니다.',
        );
      } else {
        alert('세션 생성 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
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
          <Editor value={content} onChange={setContent} name="content" />
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
