import React from 'react';
import styled from 'styled-components/native';
import { Vote } from './Vote';
import { getText, makeImgPath } from '../util';
import { Poster } from './Poster';
import { useNavigation } from '@react-navigation/native';
import { Result } from '../@types';

interface IProps {
  originalTitle: string;
  backdropImgPath: string | null;
  posterImgPath: string | null;
  rating: number;
  overview: string | undefined | null;
  fullData: Result;
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

export function Slide({
  backdropImgPath,
  overview,
  posterImgPath,
  rating,
  originalTitle,
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
    <MovieView activeOpacity={0.6} onPress={handleClickMovie}>
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
            <Vote rating={rating} total="10" />
            {/* TODO: text가 없을 때 예외 처리*/}
            <OverView>{getText(overview, 75)}</OverView>
          </TextWrapper>
        </DetailWrapper>
      </BgImg>
    </MovieView>
  );
}
