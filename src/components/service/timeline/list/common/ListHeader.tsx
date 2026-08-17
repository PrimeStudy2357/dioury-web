import { useState } from 'react';
import { Pagination } from '../../../../common/Pagination';
import {
  LIST_SORT_OPTION,
  LIST_SORT_OPTION_PARAMS,
  type ListOrder,
  type ListSortBy,
  type ListSortOption,
} from '../../../../../constants/order';
import { SortByDropdown } from './SortByDropdown';

interface ListHeaderProps {
  title: string;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
  onPageChanged: (newPage: number) => void;
  onSortChanged: (params: { sortBy: ListSortBy; order: ListOrder }) => void;
  initialSortOption?: ListSortOption;
}

/**
 * 타임라인 영역의 리스트 헤더
 * 페이지네이션 정보를 담고 있다.
 */
export const ListHeader = ({
  title,
  pagination,
  onPageChanged,
  onSortChanged,
  initialSortOption = LIST_SORT_OPTION.LATEST,
}: ListHeaderProps) => {
  const { currentPage, totalPages } = pagination;

  const [page, setPage] = useState(currentPage);
  const [sortOption, setSortOption] =
    useState<ListSortOption>(initialSortOption);

  const handlePageChanged = (newPage: number) => {
    setPage(newPage);
    onPageChanged(newPage);
  };

  const handleSortOptionChanged = (newSortOption: ListSortOption) => {
    setSortOption(newSortOption);
    setPage(1);
    onPageChanged(1);
    onSortChanged(LIST_SORT_OPTION_PARAMS[newSortOption]);
  };

  return (
    <div className="flex justify-between text-2xl font-bold pb-9">
      <span>{title}</span>
      <div className="flex gap-10">
        <SortByDropdown value={sortOption} onChange={handleSortOptionChanged} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChanged}
        />
      </div>
    </div>
  );
};
