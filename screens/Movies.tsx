import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { HMedia, Slide, VMedia } from '../components';
import { Seperator } from '../components/Seperator';

const API_KEY = '59ee2230f87d37d483a3a52eb8235751';

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.bgColor};
`;

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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  const getTrending = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
    );
    const { results } = await res.json();
    setTrending(results);
  };

  const getUpComing = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`
    );
    const { results } = await res.json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
    );
    const { results } = await res.json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getTrending(), getUpComing()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      imgPath={item.poster_path}
      title={item.original_title}
      rating={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      imgPath={item.poster_path}
      title={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color="" size="large" />
    </Loader>
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming}
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
            {nowPlaying.map((movie) => (
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
              data={trending}
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
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ListTitle>Up coming</ListTitle>
        </>
      }
      ItemSeparatorComponent={renderSeperator({
        variant: 'vertical',
        space: 10,
      })}
      renderItem={renderHMedia}
    />
  );
}
