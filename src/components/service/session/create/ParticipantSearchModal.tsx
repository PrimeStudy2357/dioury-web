import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTimelineMembersQuery } from '../../../../hooks/query/useTimelineMembersQuery';
import type { TimelineMemberType } from '../../../../types/timeline.type';

const ROLE_LABEL: Record<TimelineMemberType['role'], string> = {
  OWNER: '회장',
  ADMIN: '운영진',
  FRIEND: '정회원',
  MEMBER: '준회원',
};

interface ParticipantSearchModalProps {
  timelineId: number;
  selected: TimelineMemberType[];
  onConfirm: (participants: TimelineMemberType[]) => void;
  onClose: () => void;
}

export const ParticipantSearchModal = ({
  timelineId,
  selected,
  onConfirm,
  onClose,
}: ParticipantSearchModalProps) => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [tempSelected, setTempSelected] =
    useState<TimelineMemberType[]>(selected);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  const { data, isLoading } = useTimelineMembersQuery(timelineId, {
    query: debouncedKeyword || undefined,
    perPage: 20,
  });

  const members = data?.members ?? [];

  const handleToggle = (member: TimelineMemberType) => {
    setTempSelected((prev) =>
      prev.some((p) => p.userId === member.userId)
        ? prev.filter((p) => p.userId !== member.userId)
        : [...prev, member],
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[90vw] max-w-xl rounded-lg bg-white p-8 shadow-lg flex flex-col gap-5"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">참가자 추가</h2>
        <input
          autoFocus
          value={keyword}
          onChange={(event) => setKeyword(event.currentTarget.value)}
          placeholder="닉네임으로 검색"
          className="border-2 px-4 py-3 text-lg"
        />
        <ul className="flex flex-col max-h-96 overflow-y-auto border-t">
          {isLoading && (
            <li className="py-4 text-center text-gray-500">검색 중...</li>
          )}
          {!isLoading && members.length === 0 && (
            <li className="py-4 text-center text-gray-500">
              검색 결과가 없습니다.
            </li>
          )}
          {members.map((member) => {
            const isSelected = tempSelected.some(
              (p) => p.userId === member.userId,
            );
            return (
              <li key={member.userId}>
                <button
                  type="button"
                  onClick={() => handleToggle(member)}
                  className={`cursor-pointer w-full flex items-center justify-between px-2 py-3 border-b text-left ${
                    isSelected ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">{member.nickname}</span>
                    <span className="text-sm text-gray-500">
                      {ROLE_LABEL[member.role]}
                    </span>
                  </span>
                  {isSelected && <span className="font-bold">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md bg-black px-4 py-2 text-white"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(tempSelected)}
            className="cursor-pointer rounded-md bg-black px-4 py-2 text-white"
          >
            추가
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
