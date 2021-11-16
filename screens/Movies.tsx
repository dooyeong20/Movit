import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { Poster } from '../components/Poster';
import { Slide } from '../components/Slide';
import VMedia from '../components/VMedia';
import { getFormatDate } from '../util/';

const API_KEY = '59ee2230f87d37d483a3a52eb8235751';

const Container = styled.ScrollView`
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

const ScrollView = styled.ScrollView`
  margin-top: 20px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: bold;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0 25px;
  flex-direction: row;
  margin-top: 20px;
`;

const HColumn = styled.View`
  margin-left: 20px;
  width: 65%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
  margin-bottom: 5px;
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
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await res.json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 30,
          }}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              imgPath={movie.poster_path}
              title={movie.original_title}
              vote={movie.vote_average}
            />
          ))}
        </ScrollView>
      </ListContainer>

      <ListContainer>
        <ListTitle>Up coming</ListTitle>
        {upcoming.map((movie) => (
          <HMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <HColumn>
              <Title>
                {movie.original_title?.slice(0, 30)}
                {movie.original_title?.length > 30 && '...'}
              </Title>
              <Release>{getFormatDate(movie.release_date)}</Release>
              <Overview>
                {movie.overview !== '' && movie.overview.slice(0, 160)}{' '}
                {movie.overview.length > 160 && '...'}
              </Overview>
            </HColumn>
          </HMovie>
        ))}
      </ListContainer>
    </Container>
  );
}
