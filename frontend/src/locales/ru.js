const ru = {
  translation: {
    ui: {
      navbar: {
        brand: 'Hexlet Chat',
        logout: 'Выйти',
      },
      login: {
        header: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        question: 'Нет аккаунта?',
        toSignup: 'Регистрация',
      },
      signup: {
        header: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
      },
      chat: {
        channels: 'Каналы',
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
        inputMessage: 'Введите сообщение...',
        send: 'Отправить',
      },
      dropdown: {
        remove: 'Удалить',
        rename: 'Переименовать',
      },
      modals: {
        create: {
          header: 'Создать канал',
          channelName: 'Название канала',
          submit: 'Отправить',
        },
        remove: {
          header: 'Удалить канал',
          body: 'Уверены?',
          submit: 'Удалить',
        },
        rename: {
          header: 'Переименовать канал',
          channelName: 'Название канала',
          submit: 'Отправить',
        },
        cancel: 'Отменить',
      },
      notFoundPage: {
        notFound: 'Страница не найдена!',
        suggestion: 'Но вы можете перейти ',
        toMain: 'на главную страницу',
      },
      toasts: {
        create: 'Канал создан',
        rename: 'Канал переименован',
        remove: 'Канал удален',
      },
    },
    errors: {
      login: {
        emptyFields: 'Поля не должны быть пустыми',
        unauthorized: 'Неверные имя пользователя или пароль',
      },
      signup: {
        shortUsername: 'Не менее 3 символов',
        longUsername: 'Не более 20 символов',
        required: 'Обязательное поле',
        shortPassword: 'Не менее 6 символов',
        mismatch: 'Пароли должны совпадать',
        existingUser: 'Такой пользователь уже существует',
      },
      modal: {
        shortName: 'Не менее 3 символов',
        longName: 'Не более 20 символов',
        existingChannel: 'Такой канал уже существует',
        required: 'Обязательное поле',
      },
      networkErr: 'Ошибка сети',
    },
  },
};

export default ru;
