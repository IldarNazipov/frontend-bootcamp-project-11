import onChange from 'on-change';

export default (state, i18nextInstance) => {
  const urlInputEl = document.querySelector('#url-input');
  const feedbackEl = document.querySelector('.feedback');
  const submitButtonEl = document.querySelector('button[type="submit"]');
  const modal = document.getElementById('modal');

  const renderInputForm = (stateObj) => {
    switch (stateObj.urlSubmitProcess.state) {
      case 'invalid':
        submitButtonEl.classList.remove('disabled');
        urlInputEl.disabled = false;
        urlInputEl.classList.add('is-invalid');
        feedbackEl.classList.add('text-danger');
        urlInputEl.focus();
        feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
        break;
      case 'invalidRss':
        submitButtonEl.classList.remove('disabled');
        urlInputEl.disabled = false;
        urlInputEl.classList.remove('is-invalid');
        feedbackEl.classList.add('text-danger');
        urlInputEl.focus();
        feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
        break;
      case 'sending':
        submitButtonEl.classList.add('disabled');
        urlInputEl.disabled = true;
        feedbackEl.classList.add('text-danger');
        break;
      case 'success':
        submitButtonEl.classList.remove('disabled');
        urlInputEl.disabled = false;
        urlInputEl.classList.remove('is-invalid');
        feedbackEl.classList.remove('text-danger');
        feedbackEl.classList.add('text-success');
        feedbackEl.textContent = i18nextInstance.t(state.urlSubmitProcess.errorKey);
        urlInputEl.value = '';
        urlInputEl.focus();
        break;
      case 'valid':
        urlInputEl.classList.remove('is-invalid');
        feedbackEl.classList.remove('text-danger');
        feedbackEl.textContent = '';
        break;
      default:
        break;
    }
  };

  const renderFeeds = (stateObj) => {
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
    stateObj.feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      li.innerHTML = `
       <h3 class="h6 m-0">${feed.feedTitle}</h3>
      <p class="m-0 small text-black-50">${feed.feedDescription}</p>
      `;
      ul.prepend(li);
    });
  };

  const renderPosts = (stateObj) => {
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
    stateObj.posts.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const anchor = document.createElement('a');
      anchor.href = post.postLink;
      if (stateObj.uiState.visitedIds.includes(post.postId)) {
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
    const anchors = postsContainer.querySelectorAll('a');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-id');
        state.uiState.visitedIds.push(targetId);
        e.target.classList.remove('fw-bold');
        e.target.classList.add('fw-normal', 'link-secondary');
      });
    });
  };

  const renderModal = (stateObj) => {
    const [targetPost] = stateObj.posts
      .filter((item) => item.postId === stateObj.uiState.modal.targetPostId);
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    modalTitle.textContent = targetPost.postTitle;
    modalBody.textContent = targetPost.postDescription;
    const modalFullBtn = modal.querySelector('.full-article');
    modalFullBtn.href = targetPost.postLink;
  };

  const renderLinks = (stateObj) => {
    const visitedLinksIds = stateObj.uiState.visitedIds;
    visitedLinksIds.forEach((id) => {
      const linkElement = document.querySelector(`[data-id="${id}"]`);
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal', 'link-secondary');
    });
  };

  return onChange(state, (path) => {
    switch (path) {
      case 'urlSubmitProcess.state':
      case 'urlSubmitProcess.errorKey':
        renderInputForm(state);
        break;
      case 'feeds':
        renderFeeds(state);
        break;
      case 'posts':
        renderPosts(state);
        break;
      case 'uiState.modal.targetPostId':
        renderModal(state);
        break;
      case 'uiState.visitedIds':
        renderLinks(state);
        break;
      default:
        break;
    }
  });
};
