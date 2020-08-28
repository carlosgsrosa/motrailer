import React from 'react';
import {StatusBar} from 'react-native';

import {ImageBackground} from './styles';

export default function Splash() {
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground source={require('../../assets/images/launcher.png')} />
    </>
  );
}
