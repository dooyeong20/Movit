import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Movies } from '../screens/Movies';
import { Tv } from '../screens/Tv';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const { bgColor, textColor, highlight } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTintColor: textColor,
        tabBarInactiveTintColor: textColor,
        tabBarActiveTintColor: highlight,
        tabBarLabelStyle: {
          marginBottom: 2,
        },
        tabBarStyle: {
          backgroundColor: bgColor,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
