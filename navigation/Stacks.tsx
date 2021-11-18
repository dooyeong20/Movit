import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens/Detail';

const StackNav = createNativeStackNavigator();

export function Stacks() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Detail" component={Detail} />
    </StackNav.Navigator>
  );
}
