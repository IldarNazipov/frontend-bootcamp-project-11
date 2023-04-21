import i18next from 'i18next';
import app from './app.js';
import resources from './locales/index.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .init({
      lng: 'ru',
      debug: 'true',
      resources,
    })
    .catch((err) => console.log('something went wrong loading', err));

  const h1 = document.querySelector('h1');
  const description = document.querySelector('.lead');
  const label = document.querySelector('label');
  const example = document.querySelector('.text-muted');
  const urlInput = document.querySelector('#url-input');
  const submitBtn = document.querySelector('button[type="submit"]');
  const readFullBtn = document.querySelector('.full-article');
  const closeModalBtn = document.querySelector('.modal-footer > [data-bs-dismiss="modal"]');

  const initialRender = () => {
    h1.textContent = i18nextInstance.t('title');
    description.textContent = i18nextInstance.t('description');
    label.textContent = i18nextInstance.t('label');
    urlInput.setAttribute('placeholder', i18nextInstance.t('label'));
    submitBtn.textContent = i18nextInstance.t('submitBtn');
    example.textContent = i18nextInstance.t('example');
    document.title = h1.textContent;
    readFullBtn.textContent = i18nextInstance.t('readFull');
    closeModalBtn.textContent = i18nextInstance.t('closeModal');
  };

  initialRender();
  app(i18nextInstance);
};
