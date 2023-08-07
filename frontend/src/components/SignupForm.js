import axios from "axios";
import { useFormik } from "formik";
import { useContext, useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AuthContext } from "../App";


function SignupForm() {

  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const ref = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Не менее 3 символов')
        .max(20, 'Не более 20 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Пароли должны совпадать")
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        console.log(response);
        const { token, username } = response.data;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        setIsAuth(true);
        navigate('/');
      } catch (e) {
        formik.errors.existingUser = 'Такой пользователь уже существует';
        console.log(e);
        ref.current.select();
      }
    },
  });

  return (
    <Form
      
      className='col-12 col-md-6 mt-3 mt-mb-0'
      onSubmit={formik.handleSubmit}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '1em',
          whiteSpace: "nowrap",
          overflow: "hidden",
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
            isInvalid={(!!formik.errors.username && !!formik.touched.username)}
            autoFocus
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username}
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
            isInvalid={(formik.touched.password && formik.errors.password)}
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
            isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Button 
        type="submit"
        variant={formik.errors.existingUser ? "danger" : "outline-primary"}
        className="w-100"
        disabled={!(!!formik.values.username
          && !!formik.values.password
          && !!formik.values.confirmPassword)
          || formik.isSubmitting
          || formik.errors.existingUser}
      >
        {formik.errors.existingUser ? formik.errors.existingUser : "Зарегистрироваться"}
      </Button>
    </Form>
  );
}

export default SignupForm;
