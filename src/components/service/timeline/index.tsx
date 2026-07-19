import { useNavigate } from '@tanstack/react-router';
import { RecommendedList } from './list/recommendedList';
import { JoinedList } from './list/joinedList';

export const Timeline = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center px-6 pt-4">
        <span className="flex text-3xl font-bold">타임라인</span>
        <button
          onClick={() => {
            navigate({ to: '/timeline/create' });
          }}
          className="cursor-pointer text-3xl font-bold text-white bg-black px-4 py-2"
        >
          새 타임라인
        </button>
      </div>
      <JoinedList />
      <RecommendedList />
    </>
  );
};
