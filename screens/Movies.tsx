import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const Container = styled.ScrollView``;

const MovieView = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function Movies() {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const res = await fetch(URL);
    const { results } = await res.json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color="#2e2e2e" size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={4}
        controlsEnabled={false}
        containerStyle={{
          width: '100%',
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <MovieView key={movie.id}>
            <BgImg
              source={{
                uri: makeImgPath(movie.backdrop_path),
              }}
            />
          </MovieView>
        ))}
      </Swiper>
    </Container>
  );
}
