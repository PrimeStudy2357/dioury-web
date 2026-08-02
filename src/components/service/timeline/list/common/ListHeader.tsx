import { useState } from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
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

const PAGES_UNIT = 5;

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

  const minPage = Math.floor((page - 1) / PAGES_UNIT) * PAGES_UNIT + 1;

  const handleClickPage = (newPage: number) => {
    if (newPage < 1) {
      return;
    }
    if (newPage > totalPages) {
      return;
    }

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
        <span className="flex items-center gap-2">
          <span className="flex gap-0.5">
            <button
              className="cursor-pointer h-8 w-6 flex items-center justify-center"
              onClick={() => handleClickPage(1)}
            >
              <FirstPageIcon fontSize="medium" className="relative top-0.5" />
            </button>
            <button
              className="cursor-pointer h-8 w-6 flex items-center justify-center"
              onClick={() => handleClickPage(page - 1)}
            >
              <KeyboardArrowLeftIcon
                fontSize="medium"
                className="relative top-0.5"
              />
            </button>
          </span>
          <span className="flex gap-2">
            {[0, 1, 2, 3, 4].map((index) => {
              const pageValue = index + minPage;
              return (
                <button
                  className={`cursor-pointer h-8 w-6 flex items-center justify-center ${page === pageValue ? 'text-emerald-700' : ''}`}
                  onClick={() => handleClickPage(pageValue)}
                >
                  {pageValue}
                </button>
              );
            })}
          </span>
          <span className="flex gap-0.5">
            <button
              className="cursor-pointer h-8 w-6 flex items-center justify-center"
              onClick={() => handleClickPage(page + 1)}
            >
              <KeyboardArrowRightIcon
                fontSize="medium"
                className="relative top-0.5"
              />
            </button>
            <button
              className="cursor-pointer h-8 w-6 flex items-center justify-center"
              onClick={() => handleClickPage(totalPages)}
            >
              <LastPageIcon fontSize="medium" className="relative top-0.5" />
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};
