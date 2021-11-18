import { API_KEY, BASE_URL } from '../const';

const movies = (query: string) => () =>
  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&query=${query}`
  ).then((res) => res.json());

const tvShows = (query: string) => () =>
  fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1&query=${query}`
  ).then((res) => res.json());

export const searchAPI = { movies, tvShows };
