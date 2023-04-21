/* eslint-disable max-len */
import onChange from 'on-change';

const urlInputEl = document.querySelector('#url-input');
const feedbackEl = document.querySelector('.feedback');
const submitButtonEl = document.querySelector('button[type="submit"]');
const modal = document.getElementById('modal');

export default (state, i18nextInstance) => onChange(state, (path) => {
  if (path === 'urlSubmitProcess.state' || path === 'urlSubmitProcess.errorKey') {
    if (state.urlSubmitProcess.state === 'invalid') {
      submitButtonEl.classList.remove('disabled');
      urlInputEl.classList.add('is-invalid');
      feedbackEl.classList.add('text-danger');
      feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
    }
    if (state.urlSubmitProcess.state === 'invalidRss') {
      submitButtonEl.classList.remove('disabled');
      urlInputEl.classList.remove('is-invalid');
      feedbackEl.classList.add('text-danger');
      feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
    }
    if (state.urlSubmitProcess.state === 'sending') {
      submitButtonEl.classList.add('disabled');
      feedbackEl.classList.add('text-danger');
    }
    if (state.urlSubmitProcess.state === 'success') {
      submitButtonEl.classList.remove('disabled');
      urlInputEl.classList.remove('is-invalid');
      feedbackEl.classList.remove('text-danger');
      feedbackEl.classList.add('text-success');
      feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
      urlInputEl.value = '';
      urlInputEl.focus();
    }
    if (state.urlSubmitProcess.state === 'valid') {
      urlInputEl.classList.remove('is-invalid');
      feedbackEl.classList.remove('text-danger');
      feedbackEl.textContent = '';
    }
  }
  if (path === 'feeds') {
    const feedsContainer = document.querySelector('.feeds');
    feedsContainer.innerHTML = '';
    feedsContainer.innerHTML = `
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">${i18nextInstance.t('feeds')}</h2>
        </div>
        <ul class="list-group border-0 rounded-0"></ul>
      </div>`;
    const ul = feedsContainer.querySelector('ul');
    state.feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      li.innerHTML = `
        <h3 class="h6 m-0">${feed.feedTitle}</h3>
        <p class="m-0 small text-black-50">${feed.feedDescription}</p>
        `;
      ul.prepend(li);
    });
  }
  if (path === 'posts') {
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';
    postsContainer.innerHTML = `
      <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">${i18nextInstance.t('posts')}</h2>
        </div>
        <ul class="list-group border-0 rounded-0"></ul>
      </div>
      `;
    const ul = postsContainer.querySelector('ul');
    state.posts.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const anchor = document.createElement('a');
      anchor.href = post.postLink;
      if (state.uiState.visitedIds.includes(post.postId)) {
        anchor.classList.add('fw-normal', 'link-secondary');
      } else {
        anchor.classList.add('fw-bold');
      }
      anchor.dataset.id = post.postId;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = post.postTitle;
      li.appendChild(anchor);

      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.dataset.id = post.postId;
      button.dataset.bsToggle = 'modal';
      button.dataset.bsTarget = '#modal';
      button.textContent = i18nextInstance.t('viewBtn');
      li.appendChild(button);
      ul.prepend(li);
    });
  }
  if (path === 'uiState.modal.targetPostId') {
    const [targetPost] = state.posts.filter((item) => item.postId === state.uiState.modal.targetPostId);
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    modalTitle.textContent = targetPost.postTitle;
    modalBody.textContent = targetPost.postDescription;
    const modalFullBtn = modal.querySelector('.full-article');
    modalFullBtn.href = targetPost.postLink;
  }
  if (path === 'uiState.visitedIds') {
    const visitedLinksIds = state.uiState.visitedIds;
    visitedLinksIds.forEach((id) => {
      const linkElement = document.querySelector(`[data-id="${id}"]`);
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal', 'link-secondary');
    });
  }
});
