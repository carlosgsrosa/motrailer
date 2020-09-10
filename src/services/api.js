import axios from 'axios';

// https://www.themoviedb.org
// https://api.themoviedb.org/3/movie/157336?api_key=3fc09cc44084fa0417f92b6ab0739b08&append_to_response=videos
// https://developers.themoviedb.org/3/getting-started/introduction

// https://image.tmdb.org/t/p/w500/2Z57TAb7SI0zQ75ka4YtN5nCYrK.jpg

// Bible
// https://www.themoviedb.org/bible

// Account Detail
// https://developers.themoviedb.org/3/account/get-account-details

// LOGIN
// http://dev.travisbell.com/play/v3_auth.html

// YTS
// https://yts.mx/api#user_get_key

// WATCHLIST
// https://developers.themoviedb.org/3/movies/get-movie-account-states

export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
export const THUMBNAIL_PATH = 'http://0.gravatar.com/avatar/';
// export const ORIGINAL_IMAGE_PATH = 'https://image.tmdb.org/t/p/original/f04e6f821ff1b1c5cc1f03c2e30e08ca';
export const API_WEB = 'https://api.themoviedb.org/3/';
export const WEB_HOST = 'https://www.themoviedb.org/';
export const API_KEY = '3fc09cc44084fa0417f92b6ab0739b08';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmMwOWNjNDQwODRmYTA0MTdmOTJiNmFiMDczOWIwOCIsInN1YiI6IjVlY2Q4NTEyOWEzYzQ5MDAxZTA5NGE1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sezDZxvidwmAwCPHdJra1z57c3LvM462I3HlBXNBZA8';
export const FIREBASE_SENDER_ID = 762950146051;
// https://www.youtube.com/watch?v=lg2NaAAUz-8&feature=youtu.be
export const USER_PERMISSION_URL = 'https://www.themoviedb.org/authenticate/';
export const TMDb_LOGO =
  'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';

const api = axios.create({
  baseURL: API_WEB,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
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

export default api;
