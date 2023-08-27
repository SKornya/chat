import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const isLogged = () => localStorage.getItem('user');

  const login = (userData) => {
    localStorage.setItem('user', userData);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.setItem('user', '');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={
      {
        isAuth,
        setIsAuth,
        isLogged,
        login,
        logout,
      }
    }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
