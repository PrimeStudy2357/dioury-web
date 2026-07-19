import { ListHeader } from '../common/ListHeader';
import { ListTable } from '../common/ListTable';

export const RecommendedList = () => {
  // TODO: 추천 타임라인 API 호출

  return (
    <section className="flex flex-col px-6 pt-12 pb-8">
      <ListHeader
        title="추천 타임라인"
        pagination={{
          currentPage: 1,
          totalPages: 9,
        }}
        onPageChanged={() => {}}
      />
      <ListTable />
    </section>
  );
};
