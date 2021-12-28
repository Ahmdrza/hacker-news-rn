import axios_ from 'axios';

export const axios = axios_.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 1000,
});
