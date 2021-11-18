import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { VMedia } from './VMedia';
import { BaseResponse } from '../@types';
import { Seperator } from './Seperator';

interface IProps {
  title: string;
  data: BaseResponse | undefined;
}

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 17px;
  font-weight: bold;

  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  padding: 0 20px;
  margin-bottom: 40px;
`;

export function HList({ title, data }: IProps) {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.results}
        keyExtractor={({ id }) => id + ''}
        ItemSeparatorComponent={() => (
          <Seperator variant="horizontal" space={20} />
        )}
        renderItem={({ item }) => (
          <VMedia
            imgPath={item.poster_path}
            rating={item.vote_average}
            title={
              item.name ||
              item.title ||
              item.original_name ||
              item.original_title
            }
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
}
