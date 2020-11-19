import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image} from '../components';

import {images, colors} from '../constants';

import {Movies, Tv, Testes} from '../screens';

import {ProfileStack} from '../stacks';

const Tab = createBottomTabNavigator();

const OUTLINE = '_outline';

export default function HomeBottomTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: colors.black,
          borderTopColor: colors.blackRussian,
          borderTopWidth: 1,
        },
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({focused}) => {
          const name = focused
            ? route.name.toLowerCase()
            : route.name.toLowerCase() + OUTLINE;
          return (
            <Image
              height={40}
              width={36}
              resizeMode="contain"
              source={images.icons[name]}
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
