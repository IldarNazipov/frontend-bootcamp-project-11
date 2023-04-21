/* eslint-disable max-len */
import validate from './validate.js';
import state from './state.js';
import render from './view.js';
import fetchRss from './api-client.js';

export default () => {
  const rssFormEl = document.querySelector('.rss-form');
  const modal = document.getElementById('modal');
  const view = render(state);

  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const targetId = button.getAttribute('data-id');
    view.uiState.modal.targetPostId = targetId;
    view.uiState.visitedIds.push(targetId);
  });

  rssFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    view.urlSubmitProcess.inputData.website = formData.get('url');
    view.urlSubmitProcess.state = 'sending';
    validate(state.urlSubmitProcess.inputData, view).then(() => {
      if (state.urlSubmitProcess.state === 'valid') {
        fetchRss(state.urlSubmitProcess.inputData.website, view);
      }
    });
  });
};
