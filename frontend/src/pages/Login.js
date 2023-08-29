import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCard from '../components/Card/MyCard';
import logo from '../assets/logoIn.jpeg';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Card/CardFooter';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <MyCard logo={logo} content={<LoginForm />} footer={<Footer />} />
      </div>
    </div>
  );
};

export default Login;
