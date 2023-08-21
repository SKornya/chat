import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useRef } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes/routes';

const SignupForm = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const ref = useRef();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('errors.signup.wrongLength'))
        .max(20, t('errors.signup.wrongLength'))
        .required(t('errors.signup.required')),
      password: Yup.string()
        .min(6, t('errors.signup.shortPassword'))
        .required(t('errors.signup.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('errors.signup.mismatch'))
        .required(t('errors.signup.required')),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath, {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsAuth(true);
        navigate('/');
      } catch (e) {
        if (e.response.status !== 409) {
          toast.error(t('errors.networkErr'));
        }
        formik.errors.existingUser = true;
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '1em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        Регистрация
      </h1>
      <Form.Group controlId="username">
        <FloatingLabel
          controlId="username"
          label="Имя пользователя"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="username"
            placeholder="Имя пользователя"
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={ref}
            isInvalid={!!formik.errors.username || formik.errors.existingUser}
            autoFocus
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username || t('errors.signup.existingUser')}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group mb="4" className="form-floating mb-4" controlId="password">
        <FloatingLabel
          controlId="password"
          label="Пароль"
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group mb="4" className="form-floating mb-4" controlId="confirm-password">
        <FloatingLabel
          controlId="confirm-password"
          label="Подтвердите пароль"
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            autoComplete="confirm-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.confirmPassword}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t('ui.signup.submit')}
      </Button>
    </Form>
  );
};

export default SignupForm;
