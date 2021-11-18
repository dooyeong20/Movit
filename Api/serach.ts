import { API_KEY, BASE_URL } from '../const';

const movies = () =>
  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());

const tvShows = () =>
  fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1`).then(
    (res) => res.json()
  );

export const searchAPI = { movies, tvShows };
