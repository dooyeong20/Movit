import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { HMedia } from '../components';
import { useLikeContext } from '../provider/LikeProvider';

const Container = styled.View`
  flex: 1;
`;
const LikeTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: bold;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export function Likes() {
  const {
    state: { likes },
  } = useLikeContext();

  return (
    <Container>
      <LikeTitle>Favorite Movies/TV Shows </LikeTitle>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        data={likes}
        renderItem={({ item }) => (
          <HMedia
            fullData={item}
            imgPath={item.poster_path}
            overview={item.overview}
            title={item.original_title || item.original_name}
            rating={item.vote_average}
            releaseDate={item.release_date}
          />
        )}
      ></FlatList>
    </Container>
  );
}
