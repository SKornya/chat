import { AuthContext } from "../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
  const { isAuth } = useContext(AuthContext);
  
  if (!isAuth) {
    return <Navigate to='/login'/>;
  }

  return children;
}

export default AuthComponent;