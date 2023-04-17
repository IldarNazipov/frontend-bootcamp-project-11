import onChange from 'on-change';

export const state = {
  state: '',
  data: {
    website: '',
  },
  urls: [],
  errors: {},
};

const form = document.querySelector('.rss-form');
const input = form.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

export const watchedState = onChange(state, (path, value, previousValue) => {
  if (path === 'state' || path === 'errors') {
    if (state.state === 'invalid') {
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = state.errors;
    } else {
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.textContent = '';
      form.reset();
      input.focus();
    }
  }
});
