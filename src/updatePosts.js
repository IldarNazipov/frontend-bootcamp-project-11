import { uniqueId } from 'lodash';
import render from './view.js';

const updatePosts = (state, parsedData, i18nextInstance) => {
  const view = render(state, i18nextInstance);
  if (!parsedData || !Object.hasOwn(parsedData, 'feed')) {
    return;
  }
  const { feedTitle, feedDescription, feedLink } = parsedData.feed;
  const existingFeed = state.feeds.find((item) => item.feedTitle === feedTitle);
  if (!existingFeed) {
    const feedId = uniqueId();
    view.feeds.push({
      feedId,
      feedTitle,
      feedDescription,
      feedLink,
    });
  }

  const { posts } = parsedData;
  posts.forEach((post) => {
    const { postTitle, postDescription, postLink } = post;
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

export default updatePosts;
