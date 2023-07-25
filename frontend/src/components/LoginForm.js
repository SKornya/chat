import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../App';

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
        .min(1, 'Password should be 8 characters or more')
        .required('Поля не должны быть пустыми'),
    }),
    onSubmit: async (values) => {
      const response = await axios.post('/api/v1/login', {
        username: values.username,
        password: values.password,
      });
      console.log(response);
      const authToken = response.data.token;
      localStorage.authToken = authToken;
      setIsAuth(true);
      formik.values.login = '';
      formik.values.password = '';
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
            isInvalid={(!!formik.errors.username || !!formik.errors.password)}
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
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100">Войти</Button>
    </Form>
  );
};

export default LoginForm;

// import React, { useState } from 'react'

// export default function LoginForm() {
//   const [user, setUser] = useState({
//     username: '',
//     password: '',
//   });

//   const login = (e) => {
//     e.preventDefault();
//     console.log(user);
//     setUser({ username: '', password: '' });
//   };

//   return (
//     <form
//       className='col-12 col-md-6 mt-3 mt-mb-0'
//       onSubmit={(e) => login(e)}
//     >
//       <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>Войти</h1>
//       <div className='form-floating mb-4'>
//         <input
//           id='username'
//           className='form-control'
//           name='username'
//           autoComplete='username'
//           required
//           placeholder='Ваш ник'
//           value={user.username}
//           onChange={(e) => setUser({ ...user, username: e.target.value })}
//         />
//         <label htmlFor='username'>Ваш ник</label>
//       </div>
//       <div className='form-floating mb-4'>
//         <input
//           id='password'
//           className='form-control'
//           name='password'
//           autoComplete='current-password'
//           required
//           placeholder='Пароль'
//           type='password'
//           value={user.password}
//           onChange={(e) => setUser({ ...user, password: e.target.value })}
//         />
//         <label className='form-label' htmlFor='password'>Пароль</label>
//       </div>
//       <button
//         className='w-100 mb-3 btn btn-outline-primary'
//         type='submit'
//       >
//         Войти
//       </button>
//     </form>
//   )
// }
