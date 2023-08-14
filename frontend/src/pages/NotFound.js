import { LinkContainer } from "react-router-bootstrap";
import logo from '../assets/notFound.svg';
import { useTranslation } from "react-i18next";

function NotFound() {

  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={logo} className="img-fluid h-25" alt="not found page" />
      <h2 className="text-muted">{t('ui.notFoundPage.notFound')}</h2>
      <p className="text-muted">{t('ui.notFoundPage.suggestion')} 
        <LinkContainer
          to='/'
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#0d6efd',
          }}
        >
          <span>{t('ui.notFoundPage.toMain')}</span>
        </LinkContainer>
      </p>
    </div>
  );
}

export default NotFound;
