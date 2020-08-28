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

export const image_path = 'https://image.tmdb.org/t/p/w500';
export const original_image_path = 'https://image.tmdb.org/t/p/original';
export const api_host = 'https://api.themoviedb.org/3/';
export const web_host = 'https://www.themoviedb.org/';
export const api_key = '3fc09cc44084fa0417f92b6ab0739b08';
const access_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmMwOWNjNDQwODRmYTA0MTdmOTJiNmFiMDczOWIwOCIsInN1YiI6IjVlY2Q4NTEyOWEzYzQ5MDAxZTA5NGE1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sezDZxvidwmAwCPHdJra1z57c3LvM462I3HlBXNBZA8';

const api = axios.create({
  baseURL: api_host,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${access_token}`,
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
