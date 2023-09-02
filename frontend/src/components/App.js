import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyNavbar from './MyNavbar';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import AuthComponent from './AuthComponent';
import routes from '../routes/routes';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <MyNavbar />
      <Routes>
        <Route path={routes.pages.main} element={<AuthComponent><Main /></AuthComponent>} />
        <Route path={routes.pages.login} element={<Login />} />
        <Route path={routes.pages.signup} element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
