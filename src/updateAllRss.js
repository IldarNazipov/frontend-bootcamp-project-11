import fetchRss from './api-client.js';
import updatePosts from './updatePosts.js';

const updateAllRss = (urls, state, i18nextInstance) => {
  const promises = urls.map((url) => fetchRss(url).catch(console.log));
  Promise.all(promises)
    .then((array) => {
      array.forEach((parsedData) => updatePosts(state, parsedData, i18nextInstance));
    })
    .finally(() => setTimeout(() => {
      updateAllRss(urls, state, i18nextInstance);
    }, 5000));
};

export default updateAllRss;
