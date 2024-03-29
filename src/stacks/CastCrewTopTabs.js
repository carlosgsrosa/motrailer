import React, {useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from '../constants';

import {Cast, Crew} from '../screens';

const Tab = createMaterialTopTabNavigator();

export default function CastCrewTopTabs() {
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
        name="Cast"
        component={Cast}
        options={{
          tabBarLabel: 'Cast',
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Crew"
        component={Crew}
        options={{
          tabBarLabel: 'Crew',
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}
