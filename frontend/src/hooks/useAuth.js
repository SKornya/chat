import axios from 'axios';
import routes from '../routes/routes';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user');

  const signup = async (data) => {
    const response = await axios.post(routes.signupPath, data);
    const userData = response.data;
    setUser(userData);
  };

  const login = async (data) => {
    const response = await axios.post(routes.loginPath, data);
    const userData = response.data;
    setUser(userData);
  };

  const logout = () => setUser(null);

  return ({
    user,
    login,
    signup,
    logout,
  });
};

export default useAuth;
