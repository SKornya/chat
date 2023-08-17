import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
import resources from './locales';
import App from './components/App';

const init = () => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  i18n
    .use(initReactI18next)
    .init(options);

  filter.addDictionary('en-ru', [...filter.getDictionary('ru'), ...filter.getDictionary('en')]);
  filter.loadDictionary('en-ru');

  const rollbarConfig = {
    accessToken: 'ba87cb260c1d45c699533b6ac370c00f',
    enviroment: 'production',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
