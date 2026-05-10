import { TimelineList } from './TimelineList';

interface TimelineSectionProps {
  title: string;
}

export const TimelineSection = ({ title }: TimelineSectionProps) => {
  return (
    <section className="flex flex-col px-6 pt-12 pb-8">
      <div className="flex justify-between text-2xl font-bold pb-9">
        <span>{title}</span>
        <div className="flex gap-10">
          {/* TBD: Filter Component */}
          <span>추천순</span>
          {/* TBD: Pagination Component */}
          <span>{'< 1 2 3 4 5 >'}</span>
        </div>
      </div>
      <TimelineList />
    </section>
  );
};
