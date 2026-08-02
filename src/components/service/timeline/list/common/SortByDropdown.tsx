import { Dropdown } from '../../../../common/Dropdown';
import {
  LIST_SORT_OPTION,
  LIST_SORT_OPTION_LABEL,
  type ListSortOption,
} from '../../../../../constants/order';

const SORT_OPTIONS = Object.values(LIST_SORT_OPTION).map((sortOption) => ({
  value: sortOption,
  label: LIST_SORT_OPTION_LABEL[sortOption],
}));

interface SortByDropdownProps {
  value: ListSortOption;
  onChange: (value: ListSortOption) => void;
}

export const SortByDropdown = ({ value, onChange }: SortByDropdownProps) => (
  <span className="flex-shrink-0 whitespace-nowrap">
    <Dropdown value={value} options={SORT_OPTIONS} onChange={onChange} />
  </span>
);
