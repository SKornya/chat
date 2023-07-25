import { LinkContainer } from "react-router-bootstrap";
import logo from '../assets/notFound.svg';

function NotFound() {
  return (
    <div className="text-center">
      <img src={logo} className="img-fluid h-25" alt="not found page" />
      <h2 className="text-muted">Страница не найдена!</h2>
      <p className="text-muted">Но вы можете перейти <LinkContainer to='/' ><span>на главную страницу</span></LinkContainer></p>
    </div>
  );
}

export default NotFound;
