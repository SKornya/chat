import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
  console.log(localStorage.getItem('user'));
  if (!localStorage.getItem('user')) {
    return <Navigate to='/login'/>;
  }

  return children;
}

export default AuthComponent;