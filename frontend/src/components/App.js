import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyNavbar from './MyNavbar';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import AuthComponent from './AuthComponent';
import { AuthContext } from '../contexts/AuthProvider';

const App = () => {
  const { isLogged, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged()) {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <MyNavbar />
        <Routes>
          <Route path="/" element={<AuthComponent><Main /></AuthComponent>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
