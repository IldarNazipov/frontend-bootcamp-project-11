import { uniqueId } from 'lodash';
import render from './view.js';
import state from './state.js';

const view = render(state);

const updateRss = (document) => {
  const feedTitle = document.querySelector('title').textContent;
  const feedDescription = document.querySelector('description').textContent;
  const existingFeed = view.feeds.find((item) => item.feedTitle === feedTitle);
  if (!existingFeed) {
    const feedId = uniqueId();
    view.feeds.push({
      feedId,
      feedTitle,
      feedDescription,
    });
  }
  const posts = document.querySelectorAll('item');
  posts.forEach((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postLink = post.querySelector('link').textContent;
    const postDescription = post.querySelector('description').textContent;
    const existingPost = view.posts.find((item) => item.postTitle === postTitle);
    if (!existingPost) {
      const postId = uniqueId();
      view.posts.push({
        postId,
        postTitle,
        postLink,
        postDescription,
      });
    }
  });
};

export default updateRss;
