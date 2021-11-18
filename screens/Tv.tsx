import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';
import { useQueries, useQueryClient, UseQueryOptions } from 'react-query';
import { BaseResponse } from '../@types';
import { tvAPI } from '../Api/tv';
import { HList } from '../components';
import { Loader } from '../components/Loader';

export function Tv() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [
    { isLoading: todayLoading, data: todayData },
    { isLoading: topLoading, data: topData },
    { isLoading: trendingLoading, data: trendingData },
    { isLoading: popularLoading, data: popularData },
  ] = useQueries<UseQueryOptions<BaseResponse>[]>([
    { queryKey: ['tv', 'today'], queryFn: tvAPI.airingToday },
    { queryKey: ['tv', 'top'], queryFn: tvAPI.topRated },
    { queryKey: ['tv', 'trending'], queryFn: tvAPI.trending },
    { queryKey: ['tv', 'popular'], queryFn: tvAPI.popular },
  ]);
  const isLoading =
    todayLoading || topLoading || trendingLoading || popularLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };

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
