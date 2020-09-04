import React from 'react';
import {Modal} from 'react-native';
import LottieView from 'lottie-react-native';

import {VerticalView, Loading} from '../';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible}>
      <VerticalView flex={1} justifyContent="center" alignItems="center">
        {/* <Loading size="large" color="#ED7329" /> */}
        <LottieView
          autoSize
          source={require('../../modal/loading.json')}
          autoPlay
          loop
        />
      </VerticalView>
    </Modal>
  );
}
