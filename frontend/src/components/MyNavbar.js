// import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../contexts/AuthContext';

const MyNavbar = () => {
  const { logout, user } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>{t('ui.navbar.brand')}</Navbar.Brand></LinkContainer>
        {
          user ? <Button onClick={logout}>{t('ui.navbar.logout')}</Button> : null
        }
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
