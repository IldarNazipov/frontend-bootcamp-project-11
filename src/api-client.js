import axios from 'axios';
import parseData from './parser.js';

export default (url) => {
  const addProxy = (path) => {
    const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
    urlWithProxy.searchParams.set('url', path);
    urlWithProxy.searchParams.set('disableCache', 'true');
    return urlWithProxy.toString();
  };
  return axios.get(addProxy(url), { timeout: 5000 })
    .then((response) => response.data.contents)
    .then((data) => parseData(data, 'application/xml', url));
};
