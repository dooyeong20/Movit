import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { DetailProps } from '../@types';
import { Poster } from '../components';
import { makeImgPath } from '../util';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.bgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: center;
  padding: 0 20px;
`;
const Background = styled.ImageBackground``;
const Column = styled.View`
  flex-direction: row;
  width: 65%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  align-self: flex-end;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  margin-top: 10px;
  padding: 0 20px;
`;

export function Detail({
  route: { params },
  navigation: { setOptions },
}: DetailProps) {
  const detailTitle =
    params.title ||
    params.original_title ||
    params.name ||
    params.original_name;

  useEffect(() => {
    setOptions({
      title:
        'original_title' in params || 'title' in params ? 'Movie' : 'TV Show',
    });
  }, [detailTitle, params, setOptions]);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) }}
          blurRadius={5}
        />
        <LinearGradient
          colors={['transparent', '#1e272e']}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>{detailTitle}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
}
