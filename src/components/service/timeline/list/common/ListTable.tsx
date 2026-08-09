import { Link } from '@tanstack/react-router';
import type { TimelineType } from '../../../../../types/timeline.type';

interface ListTableProps {
  timelines?: TimelineType[];
}

export const ListTable = ({ timelines = [] }: ListTableProps) => {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="text-2xl font-bold">
          <th className="pb-4"></th>
          <th className="pb-4">On</th>
          <th className="pb-4">타임라인 이름</th>
          <th className="pb-4">태그</th>
          <th className="pb-4">참여자</th>
          <th className="pb-4">생성자</th>
          <th className="pb-4">생성일</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {timelines.map((timeline) => (
          <tr key={timeline.id}>
            <td className="py-3"></td>
            <td className="py-3">{timeline.isOn ? 'On' : 'Off'}</td>
            <td className="py-3">
              <Link
                to={'/timeline/$timelineId'}
                params={{ timelineId: String(timeline.id) }}
                className="font-bold underline"
              >
                {timeline.name}
              </Link>
            </td>
            <td className="py-3">{timeline.keywords.join(', ')}</td>
            <td className="py-3">{timeline.memberCnt}</td>
            <td className="py-3">{timeline.creatorName}</td>
            <td className="py-3">
              {new Date(timeline.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
