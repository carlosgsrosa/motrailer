import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {images, colors} from '../constants';

import {Image} from '../components';

import {
  Splash,
  Intro,
  AllMovies,
  MovieDetail,
  TVDetail,
  Search,
  Trailer,
  Settings,
  Media,
  Review,
} from '../screens';

import {HomeBottomTabs, PersonTopTabs, CastCrewTopTabs} from '../stacks';

const Stack = createStackNavigator();

const introScreenOptions = {
  headerShown: false,
  headerBackTitle: null,
  headerTitle: null,
  headerTintColor: colors.white,
  headerTransparent: true,
};

const homeScreenOptions = {
  headerTitleAlign: 'center',
  headerTintColor: colors.white,
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: colors.swamp,
    shadowColor: colors.swamp,
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
        component={HomeBottomTabs}
      />
      <Stack.Screen
        options={{
          headerTitle: null,
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Image
                marginRight="15px"
                width="24px"
                height="24px"
                source={images.icons.share}
              />
            </TouchableOpacity>
          ),
        }}
        name="MovieDetail"
        component={MovieDetail}
      />
      <Stack.Screen
        options={{
          headerTitle: null,
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Image
                marginRight="15px"
                width="24px"
                height="24px"
                source={images.icons.share}
              />
            </TouchableOpacity>
          ),
        }}
        name="TVDetail"
        component={TVDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Media"
        component={Media}
      />
      <Stack.Screen
        name="AllMovies"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Image
                marginRight="15px"
                width="24px"
                height="24px"
                source={images.icons.filter}
              />
            </TouchableOpacity>
          ),
        }}
        component={AllMovies}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Trailer" component={Trailer} />
      <Stack.Screen name="Person" component={PersonTopTabs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Cast" component={CastCrewTopTabs} />
    </Stack.Navigator>
  );
}
