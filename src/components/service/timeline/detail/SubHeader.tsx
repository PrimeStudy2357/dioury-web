import type { TimelineType } from '../../../../types/timeline.type';

interface SubHeaderProps {
  timeline: TimelineType;
}

export const SubHeader = ({ timeline }: SubHeaderProps) => {
  return (
    <section className="flex flex-col gap-3 px-6 pt-8 pb-6 border-b-2">
      <h1 className="text-3xl font-bold">{timeline.name}</h1>
      <div className="flex flex-col gap-1">
        <p>{timeline.description}</p>
      </div>
      <div className="flex gap-2">
        {timeline.keywords.map((keyword) => (
          <span key={keyword} className="text-emerald-700">
            #{keyword}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-neutral-600">
        <span>{timeline.memberCnt}명</span>
        <span>{timeline.isOn ? '온라인' : '오프라인'}</span>
        <span>{timeline.period || '비정기'}</span>
        <span>{new Date(timeline.createdAt).toLocaleDateString()} 생성</span>
      </div>
    </section>
  );
};
