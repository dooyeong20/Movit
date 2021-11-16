import React from 'react';
import styled from 'styled-components/native';
import { makeImgPath } from '../util';
import { Poster } from './Poster';

interface IProps {
  originalTitle: string;
  backdropImgPath: string;
  posterImgPath: string;
  rating: string;
  overview: string;
}

const BgImg = styled.ImageBackground`
  flex: 1;
`;

const LayerView = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 100%;
  opacity: 0.4;
  position: absolute;
`;

const MovieView = styled.TouchableOpacity`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;
const DetailWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TextWrapper = styled.View`
  width: 50%;
  margin-left: 20px;
`;

const OverView = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
`;

const Votes = styled.Text`
  padding: 3px 0;
  color: ${({ theme }) => theme.textColor};
`;

export function Slide({
  backdropImgPath,
  overview,
  posterImgPath,
  rating,
  originalTitle,
}: IProps) {
  return (
    <MovieView activeOpacity={0.6}>
      <BgImg
        source={{
          uri: makeImgPath(backdropImgPath),
        }}
        blurRadius={8}
      >
        <LayerView />
        <DetailWrapper>
          <Poster path={posterImgPath} />
          <TextWrapper>
            <Title>{originalTitle}</Title>
            <Votes>⭐️ {rating} / 10</Votes>
            {/* TODO: text가 없을 때 예외 처리*/}
            <OverView>{overview.slice(0, 90)}...</OverView>
          </TextWrapper>
        </DetailWrapper>
      </BgImg>
    </MovieView>
  );
}
