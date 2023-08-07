import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../App";

const LoginForm = () => {
  const { setIsAuth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Поля не должны быть пустыми"),
      password: Yup.string()
        .required('Поля не должны быть пустыми'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', {
          username: values.username,
          password: values.password,
        });
        console.log(response);
        const { token, username } = response.data;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        setIsAuth(true);
      } catch (e) {
        formik.errors.authError = 'Неверные имя пользователя или пароль';
      }
    },
  });

  return (
  <Form noValidate onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
    <h1 style={{ textAlign: "center", margin: "1em 0" }}>Войти</h1>
    <Form.Group controlId="username">
      <FloatingLabel
        controlId="username"
        label="Ваш ник"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          placeholder="Ваш ник"
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={formik.errors.authError}
          autoFocus
        />
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
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.errors.authError}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form.Group>
    <Button 
      type="submit"
      variant="outline-primary"
      className="w-100"
      disabled={!(!!formik.values.username && !!formik.values.password)}
    >
      Войти
    </Button>
  </Form>
  );
};

export default LoginForm;
