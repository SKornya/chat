import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import ApiContext from './contexts/ApiContext';
import resources from './locales';
import App from './components/App';
import store from './store/store';
import { addMessage } from './slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';
import { setCurrentChannelId } from './slices/channelSlice';
import AuthProvider from './contexts/AuthContext';

const Init = async () => {
  const socket = io();

  const chatApi = {
    newMessage: (body, channelId, user) => socket
      .timeout(1000)
      .emitWithAck('newMessage', {
        body,
        channelId,
        user,
      }),

    addChannel: (name) => socket
      .timeout(1000)
      .emitWithAck('newChannel', { name }),

    renameChannel: (id, name) => socket
      .timeout(1000)
      .emitWithAck('renameChannel', { id, name }),

    removeChannel: (id) => socket
      .timeout(1000)
      .emitWithAck('removeChannel', { id }),
  };

  const { dispatch } = store;

  socket.on('newMessage', (data) => {
    dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    dispatch(addChannel(data));
    dispatch(setCurrentChannelId(data.id));
  });
  socket.on('renameChannel', (data) => {
    dispatch(renameChannel({
      id: data.id,
      changes: {
        name: data.name,
      },
    }));
  });
  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data.id));
  });

  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  await i18n
    .use(initReactI18next)
    .init(options);

  filter.addDictionary('en-ru', [...filter.getDictionary('ru'), ...filter.getDictionary('en')]);
  filter.loadDictionary('en-ru');

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_LEO_TOKEN,
    enviroment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiContext.Provider value={chatApi}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApiContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
