import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { useQueries, useQueryClient, UseQueryOptions } from 'react-query';
import styled from 'styled-components/native';
import { BaseResponse } from '../@types';
import { movieAPI } from '../Api';
import { HList, HMedia, Loader, Slide } from '../components';
import { Seperator } from '../components/Seperator';

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 17px;
  font-weight: bold;
  margin-left: 25px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function Movies() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [
    { isLoading: nowPlayingLoading, data: nowPlaying },
    { isLoading: upcomingLoading, data: upcoming },
    { isLoading: trendingLoading, data: trending },
  ] = useQueries<UseQueryOptions<BaseResponse>[]>([
    { queryKey: ['movies', 'nowPlaying'], queryFn: movieAPI.nowPlaying },
    { queryKey: ['movies', 'upcoming'], queryFn: movieAPI.upcoming },
    { queryKey: ['movies', 'trending'], queryFn: movieAPI.trending },
  ]);
  const isLoading = upcomingLoading || trendingLoading || nowPlayingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const renderSeperator =
    ({
      variant,
      space,
    }: {
      variant: 'horizontal' | 'vertical';
      space: number;
    }) =>
    // eslint-disable-next-line react/display-name
    () =>
      <Seperator variant={variant} space={space} />;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming?.results}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={4}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: '100%',
              height: SCREEN_HEIGHT / 4,
              marginBottom: 25,
            }}
          >
            {nowPlaying?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropImgPath={movie.backdrop_path}
                originalTitle={movie.title || movie.original_title}
                posterImgPath={movie.poster_path}
                rating={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>

          <HList title="Trending Movies" data={trending} />
          <ListTitle>Up coming</ListTitle>
        </>
      }
      ItemSeparatorComponent={renderSeperator({
        variant: 'vertical',
        space: 10,
      })}
      renderItem={({ item }) => (
        <HMedia
          imgPath={item.poster_path}
          title={item.title || item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  );
}
