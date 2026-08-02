import { Dropdown } from '../../../../common/Dropdown';
import {
  LIST_SORT_BY,
  LIST_SORT_BY_LABEL,
  type ListSortBy,
} from '../../../../../constants/order';

const SORT_BY_OPTIONS = Object.values(LIST_SORT_BY).map((sortBy) => ({
  value: sortBy,
  label: LIST_SORT_BY_LABEL[sortBy],
}));

interface SortByDropdownProps {
  value: ListSortBy;
  onChange: (value: ListSortBy) => void;
}

export const SortByDropdown = ({ value, onChange }: SortByDropdownProps) => (
  <span className="flex-shrink-0 whitespace-nowrap">
    <Dropdown value={value} options={SORT_BY_OPTIONS} onChange={onChange} />
  </span>
);
