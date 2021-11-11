import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { Tabs } from './navigation/Tab';
import { darkTheme, lightTheme } from './theme/styled';

export default function App() {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
