import { LinkContainer } from "react-router-bootstrap";

function Footer() {
  return (
    <div className='card-footer p-4'>
      <div className='text-center'>
        Нет аккаунта? <LinkContainer
          to='/signup'
          style={{ color: '#0d6efd', cursor: 'pointer' }}
        >
          <span>Регистрация</span>
        </LinkContainer>
      </div>
    </div>
  );
}

export default Footer;
