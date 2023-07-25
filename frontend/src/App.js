import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyNavbar from './components/MyNavbar';
import NotFound from './pages/NotFound';
import Main from './pages/Main';

export const AuthContext = createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <BrowserRouter>
        <div className='d-flex flex-column h-100'>
          <MyNavbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
