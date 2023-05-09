import fetchRss from './api-client.js';
import updatePosts from './updatePosts.js';

const updateAllRss = (state, i18nextInstance) => {
  const promises = state.feeds.map((feed) => fetchRss(feed.feedLink)
    .then((parsedData) => updatePosts(state, parsedData, i18nextInstance))
    .catch(console.log));
  Promise.all(promises)
    .finally(() => setTimeout(() => {
      updateAllRss(state, i18nextInstance);
    }, 5000));
};

export default updateAllRss;
