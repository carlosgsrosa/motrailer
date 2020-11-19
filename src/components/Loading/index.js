import React from 'react';
import LottieView from 'lottie-react-native';

import {HorizontalView} from '../';

export default function Loading(props) {
  return (
    <HorizontalView paddingTop={15} paddingBottom={15} justifyContent="center">
      <LottieView
        autoSize
        source={require('../../modal/loading.json')}
        autoPlay
        loop
      />
    </HorizontalView>
  );
}
