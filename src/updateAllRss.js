import fetchRss from './api-client.js';
import updatePosts from './updatePosts.js';

const updateAllRss = (urls) => {
  const promises = urls.map((url) => fetchRss(url));
  Promise.all(promises)
    .then((array) => {
      array.forEach((item) => updatePosts(item));
    })
    .then(() => setTimeout(() => {
      updateAllRss(urls);
    }, 5000))
    .catch((e) => {
      console.log(e.message);
    });
};

export default updateAllRss;
