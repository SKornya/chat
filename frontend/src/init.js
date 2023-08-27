import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import SocketContext from './contexts/SocketContext';
import resources from './locales';
import App from './components/App';
import store from './store/store';
import { addMessage } from './slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';
import getChatApi from './chatApi';
import AuthProvider from './contexts/AuthProvider';

const Init = async () => {
  const socket = io();
  const chatApi = getChatApi(socket);

  const { dispatch } = store;

  socket.on('newMessage', (data) => {
    dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    dispatch(addChannel(data));
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
          <SocketContext.Provider value={{
            chatApi,
          }}
          >
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
