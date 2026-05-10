import { Link } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export default function GNB() {
  const { user } = useAuth();

  return (
    <header className="px-4 py-3 flex gap-2 bg-emerald-700 text-white justify-between align-middle">
      <div className="text-4xl font-bold">
        <Link to="/timeline">📒Dioury</Link>
      </div>
      <div className="text-2xl h-fit self-center">{user?.nickname}</div>
    </header>
  );
}
