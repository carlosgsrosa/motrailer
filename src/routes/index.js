import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Splash,
  Intro,
  Movie,
  Search,
  Trailer,
  Settings,
  Media,
} from '../screens';

import {HomeBottomTabStack, PersonTopTabStack} from '../stacks';

const Stack = createStackNavigator();

const introScreenOptions = {
  headerShown: false,
  headerBackTitle: null,
  headerTitle: null,
  headerTintColor: '#fff',
  headerTransparent: true,
};

const homeScreenOptions = {
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: '#EE7429',
    shadowColor: '#EE7429',
    elevation: 0,
  },
};

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName={Splash}
      screenOptions={homeScreenOptions}>
      <Stack.Screen
        options={introScreenOptions}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={introScreenOptions}
        name="Intro"
        component={Intro}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeBottomTabStack}
      />
      <Stack.Screen
        options={{
          headerTitle: null,
          headerTransparent: true,
        }}
        name="Movie"
        component={Movie}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Media"
        component={Media}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Trailer" component={Trailer} />
      <Stack.Screen name="Person" component={PersonTopTabStack} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
