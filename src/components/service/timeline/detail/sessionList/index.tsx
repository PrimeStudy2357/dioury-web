import { Link } from '@tanstack/react-router';
import { Dropdown } from '../../../../common/Dropdown';
import { Pagination } from '../../../../common/Pagination';

interface SessionListProps {
  timelineId: number;
  sessions: any;
}

export const SessionList = ({ timelineId, sessions }: SessionListProps) => {
  return (
    <section className="flex flex-col px-6 pt-12 pb-8">
      <div className="flex justify-between text-2xl font-bold pb-9">
        <span>세션 목록</span>
        <div className="flex gap-4 items-center">
          <Dropdown
            value={'최신순'}
            options={[{ value: 'RECENT', label: '최신순' }]}
            onChange={() => {}}
          />
          <Link
            to="/timeline/$timelineId/session/create"
            params={{ timelineId: String(timelineId) }}
            className="cursor-pointer text-2xl font-bold text-white bg-black px-12 py-1"
          >
            새 세션
          </Link>
        </div>
      </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr className="text-2xl font-bold">
              <th className="pb-4">생성일</th>
              <th className="pb-4">제목</th>
              <th className="pb-4">생성자</th>
              <th className="pb-4">장소</th>
              <th className="pb-4">참여자</th>
              <th className="pb-4">조회</th>
              <th className="pb-4">반응</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {sessions.map((session: any) => (
              <tr key={session.id}>
                <td className="py-3"></td>
                <td className="py-3"></td>
                <td className="py-3"></td>
                <td className="py-3"></td>
                <td className="py-3"></td>
                <td className="py-3"></td>
                <td className="py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
    </section>
  );
};
