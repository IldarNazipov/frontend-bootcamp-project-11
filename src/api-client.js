/* eslint-disable no-param-reassign */
import axios from 'axios';
import { uniqueId } from 'lodash';
import parseData from './parser.js';
import state from './state.js';

const updatePosts = (data, watchedState) => {
  const feedTitle = data.querySelector('title').textContent;
  const feedDescription = data.querySelector('description').textContent;
  const existingFeed = watchedState.feeds.find((item) => item.feedTitle === feedTitle);
  if (!existingFeed) {
    const feedId = uniqueId();
    watchedState.feeds.push({
      feedId,
      feedTitle,
      feedDescription,
    });
  }
  const posts = data.querySelectorAll('item');
  posts.forEach((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postLink = post.querySelector('link').textContent;
    const postDescription = post.querySelector('description').textContent;
    const existingPost = watchedState.posts.find((item) => item.postTitle === postTitle);
    if (!existingPost) {
      const postId = uniqueId();
      watchedState.posts.push({
        postId,
        postTitle,
        postLink,
        postDescription,
      });
    }
  });
};

const fetchRss = (url, watchedState, isUpdate = false) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`, { timeout: 5000 })
  .then((response) => {
    if (response.data.status.http_code === 200 && response.data.status.content_type.includes('xml')) {
      if (!isUpdate) {
        watchedState.urlSubmitProcess.errorKey = 'success';
        watchedState.urlSubmitProcess.state = 'success';
      }
      return response.data.contents;
    }
    throw new Error('Invalid RSS');
  })
  .then((str) => parseData(str, 'application/xml'))
  .then((data) => updatePosts(data, watchedState))
  .catch((e) => {
    if (!isUpdate) {
      watchedState.urlSubmitProcess.state = 'invalidRss';
      state.urlSubmitProcess.urls.pop();
      if (e.message === 'Invalid RSS') {
        watchedState.urlSubmitProcess.errorKey = 'invalidRss';
      } else if (e.message === 'Network Error') {
        watchedState.urlSubmitProcess.errorKey = 'networkError';
      } else {
        console.log(e);
      }
    }
  })
  .finally(() => {
    setTimeout(() => {
      fetchRss(url, watchedState, true);
    }, 5000);
  });

export default fetchRss;
