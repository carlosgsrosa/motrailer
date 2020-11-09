import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.THE_MOVIE_DB_API_KEY;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
const AVATAR_PATH = 'http://0.gravatar.com/avatar/';
const BASE_URL = 'https://api.themoviedb.org/3';
const WEB_HOST = 'https://www.themoviedb.org/';
const USER_PERMISSION_URL = 'https://www.themoviedb.org/authenticate/';
const TMDb_LOGO =
  'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${Config.THE_MOVIE_DB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// api.interceptors.request.use((request) => {
//   console.log('Starting Request', JSON.stringify(request));
//   return request;
// });

// api.interceptors.response.use((response) => {
//   console.log('Response:', JSON.stringify(response));
//   return response;
// });

export {
  api,
  API_KEY,
  IMAGE_PATH,
  AVATAR_PATH,
  BASE_URL,
  WEB_HOST,
  USER_PERMISSION_URL,
  TMDb_LOGO,
};
