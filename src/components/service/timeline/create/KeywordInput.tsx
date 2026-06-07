import React, { useState } from 'react';

interface KeywordItemProps {
  keyword: string;
  onDelete: (keyword: string) => void;
}

const KeywordItem = ({ keyword, onDelete }: KeywordItemProps) => {
  return (
    <div className="relative cursor-default border-2 h-fit px-2 rounded-xl">
      <span>{keyword}</span>
      <button
        onClick={() => onDelete(keyword)}
        className="absolute cursor-pointer bg-black text-white -right-3 -top-2 flex justify-center items-center w-5 h-5 border-2 rounded-full text-xl leading-none pb-1"
      >
        x
      </button>
    </div>
  );
};

interface KeywordInputProps {
  name: string | null;
}

const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;

export const KeywordInput = ({ name }: KeywordInputProps) => {
  const [inputKeyword, setInputKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleKeywordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(event.currentTarget.value);
  };

  const handleAddKeyword = () => {
    if (keywords.length >= 3) {
      setMessage('키워드는 최대 3개까지 입력 가능합니다.');
      return;
    }

    if (!inputKeyword) {
      setMessage('키워드를 입력해주세요.');
      return;
    }

    if (SPECIAL_CHAR_REGEX.test(inputKeyword)) {
      setMessage('특수문자는 입력할 수 없습니다.');
      return;
    }

    if (inputKeyword.length > 16) {
      setMessage('한 키워드에 최대 16자까지 입력 가능합니다.');
      return;
    }

    if (keywords.find((keyword) => inputKeyword === keyword)) {
      setMessage('이미 추가한 키워드입니다.');
      return;
    }

    setKeywords((prev) => [inputKeyword, ...prev]);
    setInputKeyword('');
  };

  const handleDeleteKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((v) => v !== keyword));
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input
            value={inputKeyword}
            onChange={handleKeywordInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleAddKeyword();
              }
            }}
          />
          <button className="font-bold" onClick={handleAddKeyword}>
            +
          </button>
        </div>
        <span className="text-base">{message}</span>
      </div>
      <div className="flex-1 flex justify-end gap-4">
        {keywords.map((keyword, index) => (
          <KeywordItem
            key={`keyword-${index}`}
            keyword={keyword}
            onDelete={handleDeleteKeyword}
          />
        ))}
      </div>
      {name && <input type="hidden" name={name} value={keywords} />}
    </div>
  );
};
