import React from 'react';

import {images} from '../../constants';
import {VerticalView, Image, Text} from '../';

export default function EmptyContent({image, message}) {
  return (
    <VerticalView
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#fff">
      <Image
        style={{tintColor: '#ccc', opacity: 0.3}}
        resizeMode="contain"
        height="180px"
        width="311px"
        source={images.background.place_holder}
      />
      <Text
        marginTop="15px"
        fontWeight="200"
        fontSize="17px"
        color="#999"
        textAlign="center">
        {message}
      </Text>
    </VerticalView>
  );
}
