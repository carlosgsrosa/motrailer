import useSWR from 'swr';
import api from '../services/api';

const useFetch = (url, params) => {
  const fetcher = api
    .get(url, params)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  const {data, error} = useSWR(url, fetcher);

  return {data, error};
};
