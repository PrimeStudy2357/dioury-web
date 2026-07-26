import { useState } from 'react';
import { LIST_ORDER, LIST_SORT_BY } from '../../../../../constants/order';
import { useRecommendedTimelinesQuery } from '../../../../../hooks/query/useRecommendedTimelinesQuery';
import { ListHeader } from '../common/ListHeader';
import { ListTable } from '../common/ListTable';

export const RecommendedList = () => {
  const [page, setPage] = useState(1);

  const { data } = useRecommendedTimelinesQuery({
    page,
    sortBy: LIST_SORT_BY.LIKE_COUNT,
    order: LIST_ORDER.DESCENDING,
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
      />
      <ListTable timelines={data?.timelines} />
    </section>
  );
};
