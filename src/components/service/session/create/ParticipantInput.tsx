import { useState } from 'react';
import type { TimelineMemberType } from '../../../../types/timeline.type';
import { ParticipantSearchModal } from './ParticipantSearchModal';

interface ParticipantItemProps {
  participant: TimelineMemberType;
  onDelete: (participant: TimelineMemberType) => void;
}

const ParticipantItem = ({ participant, onDelete }: ParticipantItemProps) => {
  return (
    <div className="relative cursor-default border-2 h-fit px-2 rounded-xl">
      <span>{participant.nickname}</span>
      <button
        type="button"
        onClick={() => onDelete(participant)}
        className="absolute cursor-pointer bg-black text-white -right-3 -top-2 flex justify-center items-center w-5 h-5 border-2 rounded-full text-xl leading-none pb-1"
      >
        x
      </button>
    </div>
  );
};

interface ParticipantInputProps {
  timelineId: number;
  value: TimelineMemberType[];
  onChange: (participants: TimelineMemberType[]) => void;
}

export const ParticipantInput = ({
  timelineId,
  value,
  onChange,
}: ParticipantInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteParticipant = (participant: TimelineMemberType) => {
    onChange(value.filter((p) => p.userId !== participant.userId));
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer border-2 px-4 py-2 font-bold"
        >
          참가자 추가
        </button>
      </div>
      <div className="flex-1 flex gap-4 flex-wrap">
        {value.map((participant) => (
          <ParticipantItem
            key={participant.userId}
            participant={participant}
            onDelete={handleDeleteParticipant}
          />
        ))}
      </div>
      {isModalOpen && (
        <ParticipantSearchModal
          timelineId={timelineId}
          selected={value}
          onConfirm={(participants) => {
            onChange(participants);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
