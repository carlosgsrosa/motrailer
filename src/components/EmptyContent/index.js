import React from 'react';

import {images} from '../../constants';

import {VerticalView, Image, Text} from '../';

export default function EmptyContent({message}) {
  return (
    <VerticalView
      justifyContent="center"
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image height="150px" width="171px" source={images.icons.logo} />
      <Text
        marginTop="15px"
        fontWeight="200"
        fontSize="18px"
        color="#666"
        textAlign="center">
        {message}
      </Text>
    </VerticalView>
  );
}
