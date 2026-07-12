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
    <div className="relative inline-block">
      <button onClick={() => setOpen((o) => !o)}>
        <span>{value ?? '선택'}</span>
        <span>▾</span>
      </button>
      {open && (
        <ul className="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-200 rounded-md shadow-sm">
          {CATEGORIES.map((category) => (
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-50"
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
