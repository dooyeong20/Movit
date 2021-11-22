import { Tfetcher } from '../@types';
import { API_KEY, BASE_URL } from '../const';

const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&region=KR`
  ).then((res) => res.json());

const upcoming: Tfetcher = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

const nowPlaying: Tfetcher = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

const detail: Tfetcher = ({ queryKey }) => {
  const [_, id] = queryKey;

  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&page=1&region=KR&append_to_response=images,videos`
  ).then((res) => res.json());
};

export const movieAPI = { trending, upcoming, nowPlaying, detail };
