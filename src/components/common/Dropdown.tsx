import { useState } from 'react';

interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  value: T | null;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  name?: string | null;
  placeholder?: string;
}

export const Dropdown = <T extends string>({
  value,
  options,
  onChange,
  name,
  placeholder = '선택',
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className="relative inline-block">
      <button className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
        <span>{selectedLabel ?? placeholder}</span>
        <span>▾</span>
      </button>
      {open && (
        <ul className="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-200 rounded-md shadow-sm">
          {options.map((option) => (
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-50"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </div>
  );
};
