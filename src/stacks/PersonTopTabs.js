import React, {useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from '../constants';

import {Person, Filmography} from '../screens';

const Tab = createMaterialTopTabNavigator();

export default function PersonTopTabs() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.white,
        style: {
          backgroundColor: colors.blackRussian,
        },
        indicatorStyle: {
          backgroundColor: colors.white,
        },
      }}>
      <Tab.Screen
        name="Person"
        component={Person}
        options={{
          tabBarLabel: 'Personal Info',
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Filmography"
        component={Filmography}
        options={{
          tabBarLabel: 'Filmography',
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}
