import App from "./components/App";
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from "./locales";
import filter from 'leo-profanity';

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

  return <App />;
};

export default init;
