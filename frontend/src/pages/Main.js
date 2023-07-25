import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

function Main() {

  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      Main page
    </div>
  );
}

export default Main;
