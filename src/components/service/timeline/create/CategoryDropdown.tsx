import { Dropdown } from '../../../common/Dropdown';

const CATEGORIES = ['게임', '스포츠', '여행', '자기개발'];

const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({
  value: category,
  label: category,
}));

interface CategoryDropdownProps {
  value: string | null;
  onChange: (value: string) => void;
  name: string | null;
}

export const CategoryDropdown = ({
  value,
  onChange,
  name,
}: CategoryDropdownProps) => (
  <Dropdown
    value={value}
    options={CATEGORY_OPTIONS}
    onChange={onChange}
    name={name}
  />
);
