import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';
import './config';
import MainNavigator from './navigation/MainNavigator';
import { darkTheme, lightTheme } from './theme/styled';

const queryClient = new QueryClient();

export default function App() {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <MainNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
