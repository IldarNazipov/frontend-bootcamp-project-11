export default (data, type) => {
  const parser = new DOMParser();
  const obj = parser.parseFromString(data, type);
  if (!obj.querySelector('rss')) {
    throw new Error('Invalid RSS');
  }
  return obj;
};
