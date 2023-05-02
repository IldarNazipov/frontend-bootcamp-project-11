/* eslint-disable no-param-reassign */
import axios from 'axios';
import parseData from './parser.js';

const fetchRss = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`, { timeout: 5000 })
  .then((response) => response.data.contents)
  .then((data) => parseData(data, 'application/xml'));

export default fetchRss;
