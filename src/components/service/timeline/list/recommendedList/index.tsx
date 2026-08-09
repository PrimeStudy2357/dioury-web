import { useState } from 'react';
import {
  LIST_ORDER,
  LIST_SORT_BY,
  LIST_SORT_OPTION,
  type ListOrder,
  type ListSortBy,
} from '../../../../../constants/order';
import { useRecommendedTimelinesQuery } from '../../../../../hooks/query/useRecommendedTimelinesQuery';
import { ListHeader } from '../common/ListHeader';
import { ListTable } from '../common/ListTable';

export const RecommendedList = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ sortBy: ListSortBy; order: ListOrder }>({
    sortBy: LIST_SORT_BY.LIKE_COUNT,
    order: LIST_ORDER.DESCENDING,
  });

  const { data } = useRecommendedTimelinesQuery({
    page,
    sortBy: sort.sortBy,
    order: sort.order,
  });

  return (
    <section className="flex flex-col px-6 pt-12 pb-8">
      <ListHeader
        title="추천 타임라인"
        pagination={{
          currentPage: page,
          totalPages: data?.pagination.totalPages ?? 1,
        }}
        onPageChanged={setPage}
        onSortChanged={setSort}
        initialSortOption={LIST_SORT_OPTION.RECOMMENDED}
      />
      <ListTable timelines={data?.timelines} />
    </section>
  );
};
