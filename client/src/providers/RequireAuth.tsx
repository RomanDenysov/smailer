import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { store } = useAuth();
  const location = useLocation();

  if (!store.isAuth) {
    // Перенаправление на страницу входа, если пользователь не аутентифицирован
    return <Navigate to="/info" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;