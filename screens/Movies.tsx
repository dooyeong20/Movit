import React, { useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { useQueries, useQueryClient, UseQueryOptions } from 'react-query';
import styled from 'styled-components/native';
import { BaseResponse } from '../@types';
import { movieAPI } from '../Api';
import { HMedia, Slide, VMedia } from '../components';
import { Seperator } from '../components/Seperator';

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.bgColor};
` as unknown as typeof FlatList;

const Loader = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ActivityIndicator = styled.ActivityIndicator`
  color: ${(props) => props.theme.textColor};
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: bold;
  margin-left: 25px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function Movies() {
  const queryClient = useQueryClient();
  const [
    {
      isLoading: nowPlayingLoading,
      data: nowPlaying,
      isRefetching: isRefetchingNowPlaying,
    },
    {
      isLoading: upcomingLoading,
      data: upcoming,
      isRefetching: isRefetchingUpcoming,
    },
    {
      isLoading: trendingLoading,
      data: trending,
      isRefetching: isRefetchingTrending,
    },
  ] = useQueries<UseQueryOptions<BaseResponse>[]>([
    { queryKey: ['movies', 'nowPlaying'], queryFn: movieAPI.nowPlaying },
    { queryKey: ['movies', 'upcoming'], queryFn: movieAPI.upcoming },
    { queryKey: ['movies', 'trending'], queryFn: movieAPI.trending },
  ]);
  const isLoading = upcomingLoading || trendingLoading || nowPlayingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  const onRefresh = () => {
    queryClient.refetchQueries(['movies']);
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

  return isLoading ? (
    <Loader>
      <ActivityIndicator color="" size="large" />
    </Loader>
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming?.results}
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
                originalTitle={movie.original_title}
                posterImgPath={movie.poster_path}
                rating={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>

          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <FlatList
              data={trending?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={({ id }) => id + ''}
              ItemSeparatorComponent={renderSeperator({
                variant: 'horizontal',
                space: 20,
              })}
              contentContainerStyle={{
                paddingHorizontal: 25,
                marginTop: 20,
              }}
              renderItem={({ item }) => (
                <VMedia
                  imgPath={item.poster_path}
                  title={item.original_title}
                  rating={item.vote_average}
                />
              )}
            />
          </ListContainer>
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
          title={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
}
