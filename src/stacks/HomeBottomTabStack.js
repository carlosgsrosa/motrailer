import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image} from '../components';

import {images} from '../constants';

import {Movies, Tv, Testes} from '../screens';

import {ProfileStack} from '../stacks';

const Tab = createBottomTabNavigator();

const OUTLINE = '_outline';

export default function HomeBottomTabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({focused}) => {
          const name = route.name.toLowerCase();
          return (
            <Image
              height="40px"
              width="36px"
              resizeMode="contain"
              source={
                focused ? images.icons[name] : images.icons[name + OUTLINE]
              }
            />
          );
        },
      })}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen
        tabBarOptions={{
          showLabel: false,
        }}
        name="Profile"
        component={ProfileStack}
      />
      {/* <Tab.Screen name="Testes" component={Testes} /> */}
    </Tab.Navigator>
  );
}
