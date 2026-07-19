import { useState } from 'react';
import { LIST_ORDER, LIST_SORT_BY } from '../../../../../constants/order';

interface ListHeaderProps {
  title: string;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
  onPageChanged: (newPage: number) => void;
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
}: ListHeaderProps) => {
  const { currentPage, totalPages } = pagination;

  const [page, setPage] = useState(currentPage);
  const [sortBy, setSortBy] = useState(LIST_SORT_BY.LIKE_COUNT);
  const [order, setOrder] = useState(LIST_ORDER.DESCENDING);

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

  return (
    <div className="flex justify-between text-2xl font-bold pb-9">
      <span>{title}</span>
      <div className="flex gap-10">
        {/* TBD: Filter Component */}
        <span>추천순</span>
        {/* TBD: Pagination Component */}
        <span className="flex gap-2">
          <button className="cursor-pointer" onClick={() => handleClickPage(1)}>
            {'<<'}
          </button>

          <button
            className="cursor-pointer"
            onClick={() => handleClickPage(page - 1)}
          >
            {'<'}
          </button>
          {[0, 1, 2, 3, 4].map((index) => {
            const pageValue = index + minPage;
            return (
              <button
                className={`cursor-pointer ${page === pageValue ? 'text-emerald-700' : ''}`}
                onClick={() => handleClickPage(pageValue)}
              >
                {pageValue}
              </button>
            );
          })}
          <button
            className="cursor-pointer"
            onClick={() => handleClickPage(page + 1)}
          >
            {'>'}
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleClickPage(totalPages)}
          >
            {'>>'}
          </button>
        </span>
      </div>
    </div>
  );
};
