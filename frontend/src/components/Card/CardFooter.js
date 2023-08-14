import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

function Footer() {

  const { t } = useTranslation();

  return (
    <div className='card-footer p-4'>
      <div className='text-center'>
        {t('ui.login.question')} <LinkContainer
          to='/signup'
          style={{ color: '#0d6efd', cursor: 'pointer' }}
        >
          <span>{t('ui.login.toSignup')}</span>
        </LinkContainer>
      </div>
    </div>
  );
}

export default Footer;
