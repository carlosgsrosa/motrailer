import React, {useEffect, useContext} from 'react';

import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {images} from '../../constants';

import {AppStatusBar} from '../../components';

import {ImageBackground} from './styles';

export default function Splash() {
  const navigation = useNavigation();
  const {loading, firstTime} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        navigation.replace(firstTime ? 'Intro' : 'Home');
      }
    }, 1000);
  }, [loading]);

  return (
    <>
      <AppStatusBar translucent barStyle="light-content" />
      <ImageBackground source={images.background.splash} />
    </>
  );
}
