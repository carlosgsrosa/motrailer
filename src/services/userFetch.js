import {BASE_URL, API_KEY} from './api';

const basicFetch = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  const data = await response.json();

  return data.results;
};

export default {
  getMovies: async (language = 'pt-BR') => {
    const queryString = `api_key=${API_KEY}&page=1&language=${language}`;
    return {
      featured_movie: {
        slug: 'featured_movie',
        title: 'Featured Movie',
        data: await basicFetch(`/trending/movie/day?${queryString}`),
      },
      originals: {
        slug: 'originals',
        title: 'Originais do Netflix',
        endpoint: `/discover/movie?with_networks=231&api_key=${API_KEY}&sort_by=popularity.desc&page=1include_null_first_air_dates=false`,
        data: await basicFetch(
          `/discover/movie?with_networks=231&api_key=${API_KEY}&sort_by=popularity.desc&page=1include_null_first_air_dates=false`,
        ),
      },
      trending: {
        slug: 'trending',
        title: 'Trending',
        endpoint: '/trending/movie/day',
        data: await basicFetch(`/trending/movie/day?${queryString}`),
      },
      upcoming: {
        slug: 'upcoming',
        title: 'Upcoming',
        endpoint: '/movie/upcoming',
        data: await basicFetch(
          `/movie/upcoming?${queryString}&sort_by=popularity.desc`,
        ),
      },
      top_rated: {
        slug: 'top_rated',
        title: 'Top Rated',
        endpoint: '/movie/top_rated',
        data: await basicFetch(
          `/movie/top_rated?${queryString}&sort_by=popularity.desc`,
        ),
      },
    };
  },
  getTVShows: async (language = 'en-US') => {
    const queryString = `api_key=${API_KEY}&page=1&language=${language}`;
    return {
      popular: {
        slug: 'popular',
        title: 'Popular',
        endpoint: '/tv/popular',
        data: await basicFetch(`/tv/popular?${queryString}`),
      },
      airing_today: {
        slug: 'airing_today',
        title: 'Airing Today',
        endpoint: '/trending/tv/day',
        data: await basicFetch(
          `/trending/tv/day?${queryString}&sort_by=popularity.desc`,
        ),
      },
      currently_airing: {
        slug: 'currently_airing',
        title: 'Currently Airing',
        endpoint: '/tv/on_the_air',
        data: await basicFetch(
          `/tv/on_the_air?${queryString}&sort_by=popularity.desc`,
        ),
      },
      top_rated: {
        slug: 'top_rated',
        title: 'Top Rated',
        endpoint: '/tv/top_rated',
        data: await basicFetch(
          `/tv/top_rated?${queryString}&sort_by=popularity.desc`,
        ),
      },
    };
  },
};
