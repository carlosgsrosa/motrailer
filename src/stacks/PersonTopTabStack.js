import React, {useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Person, Filmography} from '../screens';

const Tab = createMaterialTopTabNavigator();

export default function PersonTopTabStack() {
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
        style: {
          backgroundColor: '#EE7429',
        },
        activeTintColor: '#fff',
        indicatorStyle: {
          backgroundColor: '#fff',
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
