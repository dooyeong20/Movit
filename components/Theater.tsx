import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { THEATER_LIST } from '../const';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 40px;
`;
const ItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  padding: 2px 5px;
`;
const ItemName = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  margin-left: 5px;
  line-height: 22px;
`;

export function Theater() {
  const { textColor } = useTheme();

  const handleClickTicketing = (url: string) => async () => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <Container>
      {THEATER_LIST.map((theater) => (
        <ItemBtn
          key={theater.name}
          activeOpacity={0.6}
          onPress={handleClickTicketing(theater.url)}
        >
          <MaterialCommunityIcons
            name="ticket-percent-outline"
            color={textColor}
            size={22}
          />
          <ItemName>{theater.name}</ItemName>
        </ItemBtn>
      ))}
    </Container>
  );
}
