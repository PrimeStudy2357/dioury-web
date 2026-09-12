import React, { useState } from 'react';

interface ParticipantItemProps {
  participant: string;
  onDelete: (participant: string) => void;
}

const ParticipantItem = ({ participant, onDelete }: ParticipantItemProps) => {
  return (
    <div className="relative cursor-default border-2 h-fit px-2 rounded-xl">
      <span>{participant}</span>
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
  name: string | null;
}

export const ParticipantInput = ({ name }: ParticipantInputProps) => {
  const [inputParticipant, setInputParticipant] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleParticipantInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputParticipant(event.currentTarget.value);
  };

  const handleAddParticipant = () => {
    if (!inputParticipant) {
      setMessage('참가자를 입력해주세요.');
      return;
    }

    if (participants.find((participant) => participant === inputParticipant)) {
      setMessage('이미 추가한 참가자입니다.');
      return;
    }

    setParticipants((prev) => [inputParticipant, ...prev]);
    setInputParticipant('');
    setMessage('');
  };

  const handleDeleteParticipant = (participant: string) => {
    setParticipants((prev) => prev.filter((v) => v !== participant));
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input
            placeholder="참가자를 입력하세요"
            value={inputParticipant}
            onChange={handleParticipantInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleAddParticipant();
              }
            }}
          />
          <button
            type="button"
            className="font-bold"
            onClick={handleAddParticipant}
          >
            +
          </button>
        </div>
        <span className="text-base">{message}</span>
      </div>
      <div className="flex-1 flex gap-4 flex-wrap">
        {participants.map((participant, index) => (
          <ParticipantItem
            key={`participant-${index}`}
            participant={participant}
            onDelete={handleDeleteParticipant}
          />
        ))}
      </div>
      {name && <input type="hidden" name={name} value={participants} />}
    </div>
  );
};
