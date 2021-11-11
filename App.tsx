import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { Tabs } from './navigation/Tab';

export default function App() {
  return (
    <>
      <NavigationContainer theme={DefaultTheme}>
        <Tabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
