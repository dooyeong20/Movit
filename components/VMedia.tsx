import React from 'react';
import styled from 'styled-components/native';
import { Poster } from './Poster';

const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movie = styled.TouchableOpacity`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`;

interface IProps {
  imgPath: string;
  title: string;
  vote: string;
}

export function VMedia({ imgPath, title, vote }: IProps) {
  return (
    <Movie activeOpacity={0.8}>
      <Poster path={imgPath} />
      <Title>
        {title?.slice(0, 15)}
        {title?.length > 15 && '...'}
      </Title>
      <Votes>⭐️ {vote} / 10</Votes>
    </Movie>
  );
}
