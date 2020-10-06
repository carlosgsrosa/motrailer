import React from 'react';
import {Modal} from 'react-native';

import {VerticalView, Loading} from '../';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible}>
      <VerticalView
        backgroundColor="#434343"
        flex={1}
        justifyContent="center"
        alignItems="center">
        <Loading />
      </VerticalView>
    </Modal>
  );
}
