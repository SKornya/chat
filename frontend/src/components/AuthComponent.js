import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const AuthComponent = ({ children }) => {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthComponent;
