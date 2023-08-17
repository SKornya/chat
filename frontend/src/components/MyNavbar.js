import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext';

const MyNavbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const { t } = useTranslation();

  const logout = () => {
    localStorage.setItem('user', '');
    setIsAuth(false);
  };

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>{t('ui.navbar.brand')}</Navbar.Brand></LinkContainer>
        {
          isAuth ? <Button onClick={logout}>{t('ui.navbar.logout')}</Button> : null
        }
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
