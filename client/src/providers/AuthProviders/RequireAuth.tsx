import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { store } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await store.checkAuth();
      setAuthChecked(true);
      if (!store.isAuth) {
        // Перенаправление на страницу входа, если пользователь не аутентифицирован
        navigate('/info', { state: { from: location } });
      }
    };

    checkAuth();
  }, [store, navigate, location]);

  if (!authChecked) {
    // Пока проверяем аутентификацию, можно показать, например, спиннер
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RequireAuth;