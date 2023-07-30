import MyCard from '../components/Card/MyCard';
import logo from '../assets/logoIn.jpeg';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Card/CardFooter';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const { isAuth } = useContext(AuthContext);

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <MyCard logo={logo} content={<LoginForm/>} footer={<Footer/>} />
      </div>
    </div>
  )
}
