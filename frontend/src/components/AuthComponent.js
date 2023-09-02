import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import routes from '../routes/routes';

const AuthComponent = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={routes.pages.login} />;
  }

  return children;
};

export default AuthComponent;
