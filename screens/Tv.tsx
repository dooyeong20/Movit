import React from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';
import { useQueries, useQueryClient, UseQueryOptions } from 'react-query';
import { BaseResponse } from '../@types';
import { tvAPI } from '../Api/tv';
import { HList } from '../components';
import { Loader } from '../components/Loader';

export function Tv() {
  const queryClient = useQueryClient();
  const [
    { isLoading: todayLoading, data: todayData, isRefetching: todayRefetching },
    { isLoading: topLoading, data: topData, isRefetching: topRefetching },
    {
      isLoading: trendingLoading,
      data: trendingData,
      isRefetching: trendingRefetching,
    },
    {
      isLoading: popularLoading,
      data: popularData,
      isRefetching: popularRefetching,
    },
  ] = useQueries<UseQueryOptions<BaseResponse>[]>([
    { queryKey: ['tv', 'today'], queryFn: tvAPI.airingToday },
    { queryKey: ['tv', 'top'], queryFn: tvAPI.topRated },
    { queryKey: ['tv', 'trending'], queryFn: tvAPI.trending },
    { queryKey: ['tv', 'popular'], queryFn: tvAPI.popular },
  ]);
  const isLoading =
    todayLoading || topLoading || trendingLoading || popularLoading;
  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };
  const refreshing =
    todayRefetching || topRefetching || trendingRefetching || popularRefetching;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Top Rated Shows" data={topData} />
      <HList title="Popular Shows" data={popularData} />
      <HList title="Trending Shows" data={trendingData} />
      <HList title="Today Airing Shows" data={todayData} />
    </ScrollView>
  );
}
