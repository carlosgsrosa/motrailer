import React, {useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {images} from '../../constants';

import {ImageBackground} from './styles';

export default () => {
  const navigation = useNavigation();
  const {signed} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(signed ? 'Home' : 'Intro');
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar />
      <ImageBackground source={images.background.splash} />
    </>
  );
};
