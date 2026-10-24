import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useSessionQuery } from '../../../../hooks/query/useSessionQuery';
import { useTimelineQuery } from '../../../../hooks/query/useTimelineQuery';
import { SubHeader } from '../../timeline/detail/SubHeader';
import { ReactionBar } from './ReactionBar';

interface SessionDetailProps {
  timelineId: number;
  sessionId: number;
}

export const SessionDetail = ({
  timelineId,
  sessionId,
}: SessionDetailProps) => {
  const { data: timeline } = useTimelineQuery(timelineId);
  const { data: session } = useSessionQuery(sessionId);

  // 에디터가 만든 HTML을 innerHTML 대신 읽기 전용 tiptap으로 렌더링 (스키마 밖 태그는 버려짐)
  const editor = useEditor(
    { extensions: [StarterKit], content: session?.content, editable: false },
    [session?.content],
  );

  if (!timeline || !session) {
    return null;
  }

  return (
    <>
      <SubHeader timeline={timeline} />
      <article className="flex flex-col pt-12 pb-8">
        <div className="flex flex-col gap-6 px-6 pb-6 border-b border-neutral-200">
          <h2 className="text-4xl font-bold">
            {!session.isPublic && (
              <span aria-label="비공개" title="비공개 세션">
                🔒{' '}
              </span>
            )}
            {session.title}
          </h2>
          <div className="flex gap-4 text-xl text-neutral-600">
            <span>{session.writerNickname}</span>
            <span>{session.place}</span>
            <span>{new Date(session.date).toLocaleString()}</span>
            <span>참여자 {session.participantCnt}</span>
            <span>조회 {session.viewCnt}</span>
            <span>반응 {session.reactionCnt}</span>
            <span>댓글 {session.commentCnt}</span>
          </div>
        </div>
        <EditorContent editor={editor} className="text-xl px-6 pt-6" />
        <ReactionBar sessionId={sessionId} />
      </article>
    </>
  );
};
