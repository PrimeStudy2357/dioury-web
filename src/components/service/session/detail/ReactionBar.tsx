import { Suspense, lazy, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { isAxiosError } from 'axios';
import clsx from 'clsx';
import { requestToggleReaction } from '../../../../api/session';
import {
  reactionsQueryKey,
  useReactionsQuery,
} from '../../../../hooks/query/useReactionsQuery';
import { sessionQueryOptions } from '../../../../hooks/query/useSessionQuery';
import type { ReactionType } from '../../../../types/session.type';

/** 아무도 반응하지 않았어도 항상 보여주는 이모지 */
const QUICK_EMOJIS = ['👍', '❤️', '😂', '😮', '😢'];

// 피커(이모지 데이터 포함)는 열 때만 불러온다
const ReactionEmojiPicker = lazy(() => import('./ReactionEmojiPicker'));

interface ReactionBarProps {
  sessionId: number;
}

export const ReactionBar = ({ sessionId }: ReactionBarProps) => {
  const queryClient = useQueryClient();
  const { data: reactions = [] } = useReactionsQuery(sessionId);
  const [pickerAnchor, setPickerAnchor] = useState<HTMLElement | null>(null);

  const { mutate: toggle, isPending } = useMutation({
    mutationFn: (emoji: string) => requestToggleReaction(sessionId, emoji),
    onSuccess: (updated) => {
      queryClient.setQueryData(reactionsQueryKey(sessionId), updated);
      // 상단 "반응 N" 카운트도 함께 갱신
      queryClient.setQueryData(
        sessionQueryOptions(sessionId).queryKey,
        (session) =>
          session && {
            ...session,
            reactionCnt: updated.reduce((sum, r) => sum + r.count, 0),
          },
      );
    },
    onError: (error) => {
      alert(
        isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : '반응을 처리하지 못했습니다.',
      );
    },
  });

  // 고정 이모지를 앞에, 그 외 달린 반응을 뒤에 보여준다
  const items: ReactionType[] = [
    ...QUICK_EMOJIS.map(
      (emoji) =>
        reactions.find((r) => r.emoji === emoji) ?? {
          emoji,
          count: 0,
          reacted: false,
          users: [],
        },
    ),
    ...reactions.filter((r) => !QUICK_EMOJIS.includes(r.emoji)),
  ];

  const handleSelectFromPicker = (emoji: string) => {
    setPickerAnchor(null);

    // 이미 반응한 이모지를 골라서 취소되는 일이 없도록 추가만 한다
    if (!reactions.some((r) => r.emoji === emoji && r.reacted)) {
      toggle(emoji);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 px-6 pt-8">
      {items.map(({ emoji, count, reacted, users }) => (
        <Tooltip
          key={emoji}
          title={users.length > 0 && <ReactorList users={users} />}
          placement="top"
          arrow
        >
          {/* disabled 버튼은 hover 이벤트가 없어 툴팁이 뜨도록 span으로 감싼다 */}
          <span>
            <button
              type="button"
              disabled={isPending}
              aria-pressed={reacted}
              onClick={() => toggle(emoji)}
              className={clsx(
                'cursor-pointer flex items-center gap-1 rounded-full border px-3 py-1 text-xl disabled:cursor-wait',
                reacted
                  ? 'border-black bg-neutral-100 font-bold'
                  : 'border-neutral-300',
              )}
            >
              <span>{emoji}</span>
              {count > 0 && <span>{count}</span>}
            </button>
          </span>
        </Tooltip>
      ))}
      <button
        type="button"
        disabled={isPending}
        aria-label="다른 이모지로 반응"
        title="다른 이모지로 반응"
        onClick={(event) => setPickerAnchor(event.currentTarget)}
        className="cursor-pointer flex items-center rounded-full border border-neutral-300 px-3 py-1 text-neutral-600 disabled:cursor-wait"
      >
        <AddReactionOutlinedIcon />
      </button>
      <Popover
        open={!!pickerAnchor}
        anchorEl={pickerAnchor}
        onClose={() => setPickerAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Suspense
          fallback={
            <div className="flex h-96 w-80 items-center justify-center text-neutral-400">
              불러오는 중…
            </div>
          }
        >
          <ReactionEmojiPicker onSelect={handleSelectFromPicker} />
        </Suspense>
      </Popover>
    </div>
  );
};

// 툴팁이 화면을 덮지 않도록 일부만 보여준다
const MAX_VISIBLE_REACTORS = 15;

const ReactorList = ({ users }: { users: ReactionType['users'] }) => (
  <ul className="text-sm">
    {users.slice(0, MAX_VISIBLE_REACTORS).map((user) => (
      <li key={user.id}>{user.nickname}</li>
    ))}
    {users.length > MAX_VISIBLE_REACTORS && (
      <li>외 {users.length - MAX_VISIBLE_REACTORS}명</li>
    )}
  </ul>
);
