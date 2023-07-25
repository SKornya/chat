function SignupForm() {
  return (
    <form 
      className='col-12 col-md-6 mt-3 mt-mb-0'
      onSubmit={(e) => console.log(e)}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>Регистрация</h1>
      <div className='form-floating mb-4'>
        <input
          id='username'
          className='form-control'
          name='username'
          autoComplete='username'
          required
          placeholder='Имя пользователя'
          value='asd'
          // onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor='username'>Ваш ник</label>
      </div>
      <div className='form-floating mb-4'>
        <input 
          id='password'
          className='form-control'
          name='password'
          autoComplete='current-password'
          required
          placeholder='Пароль'
          type='password'
          value='asd'
          // onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label className='form-label' htmlFor='password-confirm'>Пароль</label>
      </div>
      <div className='form-floating mb-4'>
        <input 
          id='password-confirm'
          className='form-control'
          name='password-confirm'
          autoComplete='password-confirm'
          required
          placeholder='Подтвердите пароль'
          type='password'
          value='asd'
          // onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label className='form-label' htmlFor='password'>Пароль</label>
      </div>
      <button
        className='w-100 mb-3 btn btn-outline-primary'
        type='submit'
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default SignupForm;
