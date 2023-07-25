import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../App';

export default function MyNavbar() {

  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    delete localStorage.authToken;
    setIsAuth(false);
  };

  return (
    <Navbar expand='lg' className='shadow-sm'>
      <Container>
        <LinkContainer to='/' ><Navbar.Brand>Hexlet Chat</Navbar.Brand></LinkContainer>
        {
          isAuth ? <Button onClick={logout}>Выйти</Button> : null
        }
      </Container>
    </Navbar>
  )
}
