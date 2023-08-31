import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user');

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = () => setUser(null);

  return ({
    user,
    login,
    logout,
  });
};

export default useAuth;
