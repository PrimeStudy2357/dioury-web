import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { useConfirm } from '../../hooks/useConfirm';

export default function GNB() {
  const { user, isAuthenticated, logout } = useAuth();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (
      await confirm({
        title: '로그아웃 하시겠습니까?',
        confirmText: '로그아웃',
      })
    ) {
      await logout();
      await navigate({ to: '/login', replace: true });
      window.location.reload();
    }
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
