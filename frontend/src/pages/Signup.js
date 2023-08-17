import MyCard from '../components/Card/MyCard';
import logo from '../assets/signup.jpg';
import SignupForm from '../components/SignupForm';

const Signup = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <MyCard logo={logo} content={<SignupForm />} />
    </div>
  </div>
);

export default Signup;
