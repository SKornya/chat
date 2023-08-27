import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/AuthProvider';

const MyNavbar = () => {
  const { isLogged, logout } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>{t('ui.navbar.brand')}</Navbar.Brand></LinkContainer>
        {
          isLogged() ? <Button onClick={logout}>{t('ui.navbar.logout')}</Button> : null
        }
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
