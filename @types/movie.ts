export type Result = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_name: string;
  name: string;
};

export type BaseResponse = {
  page: number;
  results: Result[];
  total_results: number;
  total_pages: number;
};
