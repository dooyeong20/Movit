import React from 'react';
import styled from 'styled-components/native';
import { Vote } from './Vote';
import { Poster } from './Poster';
import { getText } from '../util';
import { useNavigation } from '@react-navigation/native';
import { Result } from '../@types';

const Movie = styled.TouchableOpacity`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`;

interface IProps {
  imgPath: string | null;
  title: string;
  rating: number;
  fullData: Result;
}

export function VMedia({ imgPath, title, rating, fullData }: IProps) {
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
    <Movie activeOpacity={0.8} onPress={handleClickMovie}>
      <Poster path={imgPath} />
      <Title>{getText(title, 15)}</Title>
      <Vote rating={rating} total="10" />
    </Movie>
  );
}
