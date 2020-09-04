import React from 'react';

import {images} from '../../constants';
import {VerticalView, Image, Text} from '../';

export default function EmptyContent({image, message}) {
  return (
    <VerticalView
      justifyContent="center"
      alingItems="center"
      flex={1}
      backgroundColor="#fff">
      <Image
        resizeMode="contain"
        height="180px"
        width="311px"
        source={images.background.place_holder}
      />
      <Text>{message}</Text>
    </VerticalView>
  );
}
