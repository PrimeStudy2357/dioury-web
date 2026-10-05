import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { requestSignOut } from '../../api/signin';

export default function GNB() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await requestSignOut();
    logout();
    navigate({ to: '/', replace: true });
  };

  return (
    <header className="px-4 py-3 flex gap-2 bg-emerald-700 text-white justify-between align-middle">
      <div className="text-4xl font-bold">
        <Link to="/timeline">📒Dioury</Link>
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-2xl">{user?.nickname}</div>
        {isAuthenticated ? (
          <button
            type="button"
            className="text-sm border border-white rounded px-2 py-1 cursor-pointer hover:bg-emerald-800"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm border border-white rounded px-2 py-1 hover:bg-emerald-800"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
