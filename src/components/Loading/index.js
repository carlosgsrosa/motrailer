import React from 'react';
import LottieView from 'lottie-react-native';

import {HorizontalView} from '../';

export default function Loading(props) {
  return (
    <HorizontalView
      paddingTop="15px"
      paddingBottom="15px"
      justifyContent="center">
      <LottieView
        autoSize
        source={require('../../modal/loading.json')}
        autoPlay
        loop
      />
    </HorizontalView>
  );
}
