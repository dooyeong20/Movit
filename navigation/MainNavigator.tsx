import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Tabs } from './Tabs';
import { useTheme } from 'styled-components/native';

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
      <Tabs />
    </NavigationContainer>
  );
}
