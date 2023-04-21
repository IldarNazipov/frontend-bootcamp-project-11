export default (data, type) => {
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(data, type);
  if (!xmlDocument.querySelector('rss')) {
    throw new Error('Invalid RSS');
  }
  return xmlDocument;
};
