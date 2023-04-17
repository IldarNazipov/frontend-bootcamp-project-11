import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import { state, watchedState } from './view.js';

const schema = yup.object().shape({
  website: yup.string().required().url(),
});

const validate = (fields) => {
  schema.validate(fields, { abortEarly: false })
    .then((result) => {
      if (state.urls.includes(result.website)) {
        watchedState.errors = 'RSS уже существует';
        watchedState.state = 'invalid';
      } else {
        watchedState.urls.push(result.website);
        watchedState.errors = '';
        watchedState.state = 'valid';
      }
    })
    .catch(() => {
      watchedState.errors = 'Ссылка должна быть валидным URL';
      watchedState.state = 'invalid';
    });
};
const form = document.querySelector('.rss-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  watchedState.data.website = formData.get('url');
  validate(state.data);
  console.log(state);
});
