import { Tfetcher } from '../@types';
import { API_KEY, BASE_URL } from '../const';

const topRated = () =>
  fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());

const popular: Tfetcher = () =>
  fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

const onTheAir: Tfetcher = () =>
  fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

const airingToday: Tfetcher = () =>
  fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

const trending: Tfetcher = () =>
  fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

const detail: Tfetcher = ({ queryKey }) => {
  const [_, id] = queryKey;

  return fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR&page=1&region=KR&append_to_response=images,videos`
  ).then((res) => res.json());
};

export const tvAPI = {
  topRated,
  onTheAir,
  popular,
  trending,
  airingToday,
  detail,
};
