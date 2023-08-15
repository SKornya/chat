import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
  if (!localStorage.getItem('user')) {
    return <Navigate to='/login'/>;
  }

  return children;
}

export default AuthComponent;