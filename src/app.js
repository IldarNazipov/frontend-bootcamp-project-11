/* eslint-disable max-len */
import validate from './validate.js';
import state from './state.js';
import render from './view.js';
import getRss from './api-client.js';

export default () => {
  const rssFormEl = document.querySelector('.rss-form');
  const modal = document.getElementById('modal');
  const watchedState = render(state);

  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const targetId = button.getAttribute('data-id');
    watchedState.uiState.modal.targetPostId = targetId;
    watchedState.uiState.visitedIds.push(targetId);
  });

  rssFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    watchedState.urlSubmitProcess.inputData.website = formData.get('url');
    watchedState.urlSubmitProcess.state = 'sending';
    validate(state.urlSubmitProcess.inputData, watchedState).then(() => {
      if (state.urlSubmitProcess.state === 'valid') {
        getRss(state.urlSubmitProcess.inputData.website, watchedState);
      }
    });
  });
};
