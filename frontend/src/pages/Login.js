import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCard from '../components/Card/MyCard';
import logo from '../assets/logoIn.jpeg';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Card/CardFooter';
import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
  const { isLogged, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <MyCard logo={logo} content={<LoginForm />} footer={<Footer />} />
      </div>
    </div>
  );
};

export default Login;
