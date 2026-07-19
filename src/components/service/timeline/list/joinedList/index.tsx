import { ListHeader } from '../common/ListHeader';
import { ListTable } from '../common/ListTable';

export const JoinedList = () => {
  // TODO: 관심 타임라인 API 호출

  return (
    <section className="flex flex-col px-6 pt-12 pb-8">
      <ListHeader
        title="관심 타임라인"
        pagination={{
          currentPage: 1,
          totalPages: 5,
        }}
        onPageChanged={() => {}}
      />
      <ListTable />
    </section>
  );
};
