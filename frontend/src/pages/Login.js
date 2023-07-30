import MyCard from '../components/Card/MyCard';
import logo from '../assets/logoIn.jpeg';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Card/CardFooter';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <MyCard logo={logo} content={<LoginForm/>} footer={<Footer/>} />
      </div>
    </div>
  )
}
