import React from 'react';
import styled from 'styled-components/native';
import { getFormatDate, getText } from '../util';
import { Poster } from './Poster';

interface IProps {
  imgPath: string;
  title: string;
  overview: string;
  releaseDate: string;
}

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

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export function HMedia({ imgPath, title, overview, releaseDate }: IProps) {
  return (
    <HMovie>
      <Poster path={imgPath} />
      <HColumn>
        <Title>{getText(title, 30)}</Title>
        <Release>{getFormatDate(releaseDate)}</Release>
        <Overview>{getText(overview, 160)}</Overview>
      </HColumn>
    </HMovie>
  );
}
