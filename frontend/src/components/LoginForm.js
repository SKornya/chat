import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('errors.login.emptyFields')),
      password: Yup.string()
        .required(t('errors.login.emptyFields')),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          username: values.username,
          password: values.password,
        };
        await login(data);
      } catch (e) {
        if (e.response.status !== 401) {
          toast.error(t('errors.networkError'));
        }
        formik.errors.unauthorized = true;
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 style={{ textAlign: 'center', margin: '1em 0' }}>{t('ui.login.header')}</h1>
      <Form.Group controlId="username">
        <FloatingLabel
          controlId="username"
          label={t('ui.login.username')}
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="username"
            placeholder={t('ui.login.username')}
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={formik.errors.unauthorized}
            autoFocus
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group mb="4" className="form-floating mb-4" controlId="password">
        <FloatingLabel
          controlId="password"
          label={t('ui.login.password')}
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="password"
            placeholder={t('ui.login.password')}
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={formik.errors.unauthorized}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {t('errors.login.unauthorized')}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={!(!!formik.values.username && !!formik.values.password)}
      >
        {t('ui.login.submit')}
      </Button>
    </Form>
  );
};

export default LoginForm;
