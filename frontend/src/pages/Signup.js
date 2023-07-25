import MyCard from '../components/MyCard';
import logo from '../assets/signup.jpg';
import SignupForm from '../components/SignupForm';

export default function Signup() {
  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <MyCard logo={logo} content={<SignupForm/>} />
      </div>
    </div>
  )
}
