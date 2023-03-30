import { useAuth } from 'Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  children,
  redirectTo = '/goit-react-hw-08-phonebook',
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
};

export default PrivateRoute;
