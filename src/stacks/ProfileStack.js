import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Profile} from '../screens';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#ffffff',
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: '#EE7429',
          shadowColor: '#EE7429',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        options={{
          headerBackTitle: null,
          headerTitle: null,
          headerTintColor: '#ffffff',
          headerTransparent: true,
        }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}
