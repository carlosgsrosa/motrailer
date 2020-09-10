import React from 'react';
import {Modal} from 'react-native';

import {VerticalView, Loading} from '../';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible}>
      <VerticalView flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </VerticalView>
    </Modal>
  );
}
