import React from 'react';
import { useQueries } from 'react-query';
import { tvAPI } from '../Api/tv';
import { Loader } from '../components/Loader';

export function Tv() {
  const [
    { isLoading: todayLoading, data: todayData },
    { isLoading: topLoading, data: topData },
    { isLoading: trendingLoading, data: trendingData },
  ] = useQueries([
    { queryKey: ['tv', 'today'], queryFn: tvAPI.airingToday },
    { queryKey: ['tv', 'top'], queryFn: tvAPI.topRated },
    { queryKey: ['tv', 'trending'], queryFn: tvAPI.trending },
  ]);

  const isLoading = todayLoading || topLoading || trendingLoading;

  return isLoading ? <Loader /> : null;
}
