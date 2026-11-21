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
import type { CommentType, ReplyType } from '../../../../types/session.type';

const MAX_COMMENT_LENGTH = 1000;

/** 삭제되지 않은 댓글 + 답글 수 (session.commentCnt와 같은 기준) */
const countComments = (comments: CommentType[]) =>
  comments.reduce(
    (sum, comment) =>
      sum + (comment.isDeleted ? 0 : 1) + comment.replies.length,
    0,
  );

interface CommentSectionProps {
  sessionId: number;
}

export const CommentSection = ({ sessionId }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const { data: comments = [] } = useCommentsQuery(sessionId);
  const [content, setContent] = useState('');
  /** 답글 입력창이 열린 댓글 (한 번에 하나만) */
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  /** 답글 목록을 펼친 댓글 */
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const handleUpdated = (updated: CommentType[]) => {
    queryClient.setQueryData(commentsQueryKey(sessionId), updated);
    // 상단 "댓글 N" 카운트도 함께 갱신
    queryClient.setQueryData(
      sessionQueryOptions(sessionId).queryKey,
      (session) =>
        session && { ...session, commentCnt: countComments(updated) },
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

  const { mutate: createReply, isPending: isCreatingReply } = useMutation({
    mutationFn: (parentId: number) =>
      requestCreateComment(sessionId, replyContent, parentId),
    onSuccess: (updated) => {
      handleUpdated(updated);
      setReplyContent('');
      setReplyParentId(null);
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

  const toggleReplies = (commentId: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (!next.delete(commentId)) next.add(commentId);
      return next;
    });
  };

  /** 기존 답글을 보면서 작성할 수 있도록 답글 목록도 함께 펼친다 */
  const openReplyForm = (commentId: number) => {
    setReplyParentId(commentId);
    setReplyContent('');
    setExpandedIds((prev) => new Set(prev).add(commentId));
  };

  return (
    <section className="flex flex-col gap-4 px-6 pt-8">
      <h3 className="text-2xl font-bold">댓글 {countComments(comments)}</h3>
      <ul className="flex flex-col">
        {comments.map((comment) => {
          const { id, replies } = comment;
          const isExpanded = expandedIds.has(id);
          const isReplying = replyParentId === id;

          return (
            <li
              key={id}
              className="flex flex-col gap-2 border-b border-neutral-200 py-4"
            >
              {comment.isDeleted ? (
                <p className="text-xl text-neutral-400">삭제된 댓글입니다.</p>
              ) : (
                <CommentItem
                  comment={comment}
                  isDeleting={isDeleting}
                  onDelete={handleDelete}
                  onReply={() => openReplyForm(id)}
                />
              )}
              {replies.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleReplies(id)}
                  aria-expanded={isExpanded}
                  className="cursor-pointer self-start text-sm font-bold text-neutral-500"
                >
                  {isExpanded ? '답글 숨기기' : `답글 ${replies.length}개`}
                </button>
              )}
              {(isExpanded || isReplying) && (
                <div className="ml-6 flex flex-col gap-3 border-l-2 border-neutral-200 pl-4">
                  {isExpanded && (
                    <ul className="flex flex-col">
                      {replies.map((reply) => (
                        <li key={reply.id} className="py-2">
                          <CommentItem
                            comment={reply}
                            isDeleting={isDeleting}
                            onDelete={handleDelete}
                            compact
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  {isReplying && (
                    <CommentForm
                      value={replyContent}
                      onChange={setReplyContent}
                      onSubmit={() => createReply(id)}
                      onCancel={() => setReplyParentId(null)}
                      isPending={isCreatingReply}
                      label="답글"
                      rows={1}
                      autoFocus
                      compact
                    />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <CommentForm
        value={content}
        onChange={setContent}
        onSubmit={create}
        isPending={isCreating}
        label="댓글"
        rows={3}
      />
    </section>
  );
};

interface CommentItemProps {
  comment: ReplyType;
  isDeleting: boolean;
  onDelete: (commentId: number) => void;
  /** 없으면 답글 버튼을 숨김 (답글에는 답글 불가) */
  onReply?: () => void;
  /** 답글용 작은 글씨 */
  compact?: boolean;
}

const CommentItem = ({
  comment: { id, content, createdAt, user, isMine },
  isDeleting,
  onDelete,
  onReply,
  compact,
}: CommentItemProps) => (
  <div className="flex flex-col gap-1">
    <div
      className={`flex items-center gap-3 text-neutral-600 ${compact ? 'text-sm' : ''}`}
    >
      <span className="font-bold text-black">{user.nickname}</span>
      <span>{new Date(createdAt).toLocaleString()}</span>
      <div className="ml-auto flex gap-3 text-sm text-neutral-500">
        {onReply && (
          <button type="button" onClick={onReply} className="cursor-pointer">
            답글
          </button>
        )}
        {isMine && (
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete(id)}
            className="cursor-pointer disabled:cursor-wait"
          >
            삭제
          </button>
        )}
      </div>
    </div>
    <p
      className={`whitespace-pre-wrap break-words ${compact ? 'text-base' : 'text-xl'}`}
    >
      {content}
    </p>
  </div>
);

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  /** 있으면 취소 버튼을 표시 */
  onCancel?: () => void;
  isPending: boolean;
  /** "댓글" | "답글" — placeholder와 aria-label에 사용 */
  label: string;
  rows: number;
  autoFocus?: boolean;
  /** 답글용 작은 입력창 */
  compact?: boolean;
}

const CommentForm = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  isPending,
  label,
  rows,
  autoFocus,
  compact,
}: CommentFormProps) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      if (value.trim()) onSubmit();
    }}
    className="flex flex-col gap-2"
  >
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      maxLength={MAX_COMMENT_LENGTH}
      rows={rows}
      placeholder={`${label}을 입력하세요`}
      aria-label={`${label} 입력`}
      autoFocus={autoFocus}
      className={`resize-none rounded border border-neutral-300 ${compact ? 'p-2 text-base' : 'p-3 text-xl'}`}
    />
    <div className={`flex gap-2 self-end ${compact ? 'text-sm' : ''}`}>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className={`cursor-pointer rounded border border-neutral-300 ${compact ? 'px-3 py-1' : 'px-4 py-2'}`}
        >
          취소
        </button>
      )}
      <button
        type="submit"
        disabled={isPending || !value.trim()}
        className={`cursor-pointer rounded bg-black text-white disabled:cursor-not-allowed disabled:bg-neutral-400 ${compact ? 'px-3 py-1' : 'px-4 py-2'}`}
      >
        등록
      </button>
    </div>
  </form>
);
