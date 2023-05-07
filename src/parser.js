export default (data, type) => {
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(data, type);
  const parseError = xmlDocument.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }
  const feedTitle = xmlDocument.querySelector('title').textContent;
  const feedDescription = xmlDocument.querySelector('description').textContent;
  const posts = Array.from(xmlDocument.querySelectorAll('item'));
  const mappedPosts = posts.map((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postLink = post.querySelector('link').textContent;
    const postDescription = post.querySelector('description').textContent;
    return {
      postTitle,
      postLink,
      postDescription,
    };
  });

  return {
    feed: {
      feedTitle,
      feedDescription,
    },
    posts: mappedPosts,
  };
};
