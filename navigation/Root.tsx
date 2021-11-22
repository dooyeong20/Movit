import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from './Tabs';
import { Stacks } from './Stacks';

const RootNav = createStackNavigator();

export function Root() {
  return (
    <RootNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootNav.Screen name="Tabs" component={Tabs} />
      <RootNav.Screen name="Stacks" component={Stacks} />
    </RootNav.Navigator>
  );
}
