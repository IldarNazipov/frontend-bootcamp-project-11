import i18next from 'i18next';
import resources from './locales/index.js';

const i18nextInstance = i18next.createInstance();
i18nextInstance
  .init({
    lng: 'ru',
    debug: 'true',
    resources,
  })
  .catch((err) => console.log('something went wrong loading', err));

export default i18nextInstance;
