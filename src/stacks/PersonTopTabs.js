import React, {useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
        activeTintColor: '#ffffff',
        style: {
          backgroundColor: '#EE7429',
        },
        indicatorStyle: {
          backgroundColor: '#ffffff',
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
          tabBarLabel: 'Filmografia',
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}
