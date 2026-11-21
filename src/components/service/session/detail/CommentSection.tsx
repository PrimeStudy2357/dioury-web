import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import {
  requestCreateComment,
  requestDeleteComment,
} from '../../../../api/session';
import {
  commentsQueryKey,
  useCommentsQuery,
} from '../../../../hooks/query/useCommentsQuery';
import { sessionQueryOptions } from '../../../../hooks/query/useSessionQuery';
import { useConfirm } from '../../../../hooks/useConfirm';
import type { CommentType } from '../../../../types/session.type';

const MAX_COMMENT_LENGTH = 1000;

interface CommentSectionProps {
  sessionId: number;
}

export const CommentSection = ({ sessionId }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const { data: comments = [] } = useCommentsQuery(sessionId);
  const [content, setContent] = useState('');

  const handleUpdated = (updated: CommentType[]) => {
    queryClient.setQueryData(commentsQueryKey(sessionId), updated);
    // 상단 "댓글 N" 카운트도 함께 갱신
    queryClient.setQueryData(
      sessionQueryOptions(sessionId).queryKey,
      (session) => session && { ...session, commentCnt: updated.length },
    );
  };

  const handleError = (error: Error) => {
    alert(
      isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : '댓글을 처리하지 못했습니다.',
    );
  };

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: () => requestCreateComment(sessionId, content),
    onSuccess: (updated) => {
      handleUpdated(updated);
      setContent('');
    },
    onError: handleError,
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (commentId: number) =>
      requestDeleteComment(sessionId, commentId),
    onSuccess: handleUpdated,
    onError: handleError,
  });

  const handleDelete = async (commentId: number) => {
    if (await confirm({ title: '댓글을 삭제하시겠습니까?' })) {
      remove(commentId);
    }
  };

  return (
    <section className="flex flex-col gap-4 px-6 pt-8">
      <h3 className="text-2xl font-bold">댓글 {comments.length}</h3>
      <ul className="flex flex-col">
        {comments.map(({ id, content, createdAt, user, isMine }) => (
          <li
            key={id}
            className="flex flex-col gap-1 border-b border-neutral-200 py-4"
          >
            <div className="flex items-center gap-3 text-neutral-600">
              <span className="font-bold text-black">{user.nickname}</span>
              <span>{new Date(createdAt).toLocaleString()}</span>
              {isMine && (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(id)}
                  className="cursor-pointer ml-auto text-sm text-neutral-500 disabled:cursor-wait"
                >
                  삭제
                </button>
              )}
            </div>
            <p className="text-xl whitespace-pre-wrap break-words">{content}</p>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (content.trim()) create();
        }}
        className="flex flex-col gap-2"
      >
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          rows={3}
          placeholder="댓글을 입력하세요"
          aria-label="댓글 입력"
          className="resize-none rounded border border-neutral-300 p-3 text-xl"
        />
        <button
          type="submit"
          disabled={isCreating || !content.trim()}
          className="cursor-pointer self-end rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          등록
        </button>
      </form>
    </section>
  );
};
