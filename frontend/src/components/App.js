import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyNavbar from './MyNavbar';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import AuthComponent from './AuthComponent';
import AuthContext from '../contexts/AuthContext';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={
      {
        isAuth,
        setIsAuth,
      }
    }
    >
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
    </AuthContext.Provider>
  );
};

export default App;
