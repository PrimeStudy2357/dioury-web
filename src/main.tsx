import { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';
import reportWebVitals from './reportWebVitals.ts';
import type { UserType } from './types/user.type.ts';
import { requestWhoAmI } from './api/user/index.ts';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const login = (userData: UserType) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // TODO: 서버 로그아웃 API 호출
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 사이트 접속과 함께 내 정보 호출
        const user = await requestWhoAmI();
        setUser(user);
      } catch (error) {
        setUser(null); // 세션이 없거나 만료
      } finally {
        setIsInitialLoading(false);
      }
    };

    initAuth();
  }, []);

  if (isInitialLoading) return null;

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: !!user,
          user,
          login,
          logout,
        },
      }}
    />
  );
}

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
