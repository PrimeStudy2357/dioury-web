import { useState } from 'react';

const CATEGORIES = ['게임', '스포츠', '여행', '자기개발'];

interface CategoryDropdownProps {
  value: string | null;
  onChange: (value: string) => void;
  name: string | null;
}

export const CategoryDropdown = ({
  value,
  onChange,
  name,
}: CategoryDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}>
        <span>{value ?? '선택하세요'}</span>
        <span>▾</span>
      </button>
      {open && (
        <ul>
          {CATEGORIES.map((category) => (
            <li
              key={category}
              onClick={() => {
                onChange(category);
                setOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </div>
  );
};
