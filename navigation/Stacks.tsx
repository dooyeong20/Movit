import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens/Detail';
import { useTheme } from 'styled-components';
import { StackParamList } from '../@types';

const StackNav = createNativeStackNavigator<StackParamList>();

export function Stacks() {
  const { bgColor, textColor } = useTheme();

  return (
    <StackNav.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTintColor: textColor,
      }}
    >
      <StackNav.Screen name="Detail" component={Detail} />
    </StackNav.Navigator>
  );
}
