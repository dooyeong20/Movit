import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Root } from './Root';

export default function MainNavigator() {
  const { bgColor, textColor } = useTheme();
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: bgColor,
      text: textColor,
    },
  };
  return (
    <NavigationContainer theme={myTheme}>
      <Root />
    </NavigationContainer>
  );
}
