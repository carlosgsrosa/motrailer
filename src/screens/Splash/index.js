import React, {useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {images} from '../../constants';

import {ImageBackground} from './styles';

export default function Splash() {
  const navigation = useNavigation();
  const {loading, signed} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        navigation.replace(signed ? 'Home' : 'Intro');
      }
    }, 1000);
  }, [loading]);

  return (
    <>
      <StatusBar />
      <ImageBackground source={images.background.splash} />
    </>
  );
}
