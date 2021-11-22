import React from 'react';
import styled from 'styled-components/native';
import { Vote } from './Vote';
import { getFormatDate, getText } from '../util';
import { Poster } from './Poster';
import { useNavigation } from '@react-navigation/native';
import { Result } from '../@types';

interface IProps {
  imgPath: string | null;
  title: string;
  overview: string | undefined | null;
  releaseDate?: string;
  rating?: number;
  fullData: Result;
}

const Container = styled.TouchableOpacity`
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

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export function HMedia({
  imgPath,
  title,
  overview,
  releaseDate,
  rating,
  fullData,
}: IProps) {
  const navigation = useNavigation();
  const handleClickMovie = () => {
    // @ts-ignore
    navigation.navigate('Stacks', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };

  return (
    <Container activeOpacity={0.7} onPress={handleClickMovie}>
      <Poster path={imgPath} />
      <HColumn>
        <Title>{getText(title, 30)}</Title>
        {releaseDate && <Release>{getFormatDate(releaseDate)}</Release>}
        {rating && <Vote rating={rating} total="10" />}
        <Overview>{getText(overview, 100)}</Overview>
      </HColumn>
    </Container>
  );
}
